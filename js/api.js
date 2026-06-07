async function apiGet(action, params = {}) {

    try {

        showLoading();

        const query = new URLSearchParams({
            action,
            ...params
        });

        const response = await fetch(
            `${CONFIG.API_URL}?${query.toString()}`
        );

        const result = await response.json();

        hideLoading();

        return result;

    } catch (error) {

        hideLoading();

        console.error(error);

        showToast("Terjadi kesalahan", "error");

        return {
            success: false,
            message: error.message
        };
    }
}

async function apiPost(data = {}) {

    try {

        showLoading();

        const response = await fetch(CONFIG.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        hideLoading();

        return result;

    } catch (error) {

        hideLoading();

        console.error(error);

        showToast("Terjadi kesalahan", "error");

        return {
            success: false,
            message: error.message
        };
    }
}
