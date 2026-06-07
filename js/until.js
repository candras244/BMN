function showLoading() {
    document.getElementById("loadingOverlay").style.display = "flex";
}

function hideLoading() {
    document.getElementById("loadingOverlay").style.display = "none";
}

function showToast(message) {

    const container =
        document.getElementById("toastContainer");

    const toast =
        document.createElement("div");

    toast.className = "toast";
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR"
        }
    ).format(number || 0);
}

function formatTanggal(dateString) {

    if (!dateString) return "-";

    return new Date(dateString)
        .toLocaleDateString("id-ID");
}

function generateId(prefix = "") {

    const now = Date.now();

    return prefix + now;
}
