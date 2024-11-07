document.addEventListener("DOMContentLoaded", function() {
    // Get the current datetime
    const dateTime = new Date().toLocaleString();

    // Get the current page URL
    const pageUrl = window.location.href;

    // Get basic user information (browser and OS details)
    const userAgent = navigator.userAgent;
    const browserInfo = navigator.appName + " " + navigator.appVersion;
    const osInfo = navigator.platform;

    // Log the information
    console.log("Page Load Information:");
    console.log("Datetime:", dateTime);
    console.log("Page URL:", pageUrl);
    console.log("User Agent:", userAgent);
    console.log("Browser Info:", browserInfo);
    console.log("Operating System:", osInfo);

    // (Optional) Send this information to a backend server
    // fetch("https://your-server.com/log", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         dateTime: dateTime,
    //         pageUrl: pageUrl,
    //         userAgent: userAgent,
    //         browserInfo: browserInfo,
    //         osInfo: osInfo
    //     })
    // }).catch(error => console.error("Error logging page load info:", error));
});