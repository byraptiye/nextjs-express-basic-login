export const apiCodes = {
    success: {
        statusCode: 200,
        message: 'İstek başarılı.'
    },
    empty: {
        statusCode: 400,
        message: 'Geçersiz parametre.'
    },
    authFailed: {
        statusCode: 401,
        message: 'Doğrulama başarısız.'
    },
    invalid: {
        statusCode: 422,
        message: 'Hatalı bir değer gönderildi.'
    },
    server: {
        statusCode: 500,
        message: 'Sunucu hatası'
    }
};