
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY')
// Make sure these match exactly with your Airtable setup
const BASE_ID = 'appZYmGAfoDoqtchL'
const TABLE_NAME = 'Form Submissions'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { formType, formData } = await req.json()
    
    console.log('Submitting to Airtable:', { formType, formData })

    if (!AIRTABLE_API_KEY) {
      throw new Error('AIRTABLE_API_KEY is not set')
    }

    const fieldsToSubmit = {
      FormType: formType,
      ...formData,
      SubmittedAt: new Date().toISOString(),
    }

    // If there's a file_url, add it to the Airtable record
    if (formData.file_url) {
      fieldsToSubmit.FileURL = formData.file_url
    }

    console.log(`Connecting to Airtable BASE_ID: ${BASE_ID}, TABLE: ${TABLE_NAME}`)
    console.log('Fields being submitted:', fieldsToSubmit)
    
    // Use encodeURIComponent for the table name to handle spaces
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: fieldsToSubmit,
          },
        ],
      }),
    })

    // Detailed logging of the response
    const responseText = await response.text();
    console.log('Raw Airtable response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Airtable response:', responseText);
      throw new Error(`Invalid JSON response from Airtable: ${responseText}`);
    }
    
    if (!response.ok) {
      console.error('Airtable API error status code:', response.status);
      console.error('Airtable API error response:', data);
      throw new Error(`Airtable API error (${response.status}): ${JSON.stringify(data)}`);
    }
    
    console.log('Airtable submission successful:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
