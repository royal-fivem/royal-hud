const SendNuiCallback = async (endpoint, data, cb) => {
    try {
        // @ts-ignore
        const response = await fetch(`https://${GetParentResourceName()}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data || {})
        });
        const responseData = await response.json();
        cb(responseData);
    } catch (error) {
        // console.error('Callback Error:', error);
    }
};


export default SendNuiCallback;