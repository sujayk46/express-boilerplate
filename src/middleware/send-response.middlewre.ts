
// A helper function to send standardized responses
export  function sendResponse(data: any, message: string, success: boolean) {
    // Standardize the response format
    return {
        data: data || [] || null,  // Default to an empty array if no data is provided
        message: message || 'Success',
        success: success
    };
}
