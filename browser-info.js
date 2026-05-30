/**
 * Browser Data Utility
 * Provides information about the current browser and OS.
 * Can be used as a standalone script.
 */

/**
 * 現在のブラウザ情報を取得する
 * @returns {Object} { name, os, ua, lower, keyword, isSafariMobile }
 */
function getBrowserData() {
    const ua = window.navigator.userAgent;
    const lower = ua.toLowerCase();
    let name = "";
    let keyword = "";

    // 判定ロジック
    if (lower.includes("line")) {
        name = "LINE";
        keyword = "line";
    } else if (lower.includes("edg")) {
        name = "Edge";
        keyword = "edg";
    } else if (lower.includes("chrome")) {
        name = "Chrome";
        keyword = "chrome";
    } else if (lower.includes("safari")) {
        name = "Safari";
        keyword = "safari";
    } else if (lower.includes("firefox")) {
        name = "Firefox";
        keyword = "firefox";
    } else if (lower.includes("msie") || lower.includes("trident")) {
        name = "Internet Explorer";
        keyword = lower.includes("msie") ? "msie" : "trident";
    } else {
        name = "Other";
        keyword = "";
    }

    // OS/端末判定
    let os = "Unknown OS";
    if (lower.includes("win")) os = "Windows";
    else if (lower.includes("iphone")) os = "iPhone";
    else if (lower.includes("ipad")) os = "iPad";
    else if (lower.includes("mac")) os = "Mac";
    else if (lower.includes("android")) os = "Android";
    else if (lower.includes("linux")) os = "Linux";

    // Safariモバイル判定 (iOSのブラウザ全般)
    const isSafariMobile =
        /iP(ad|hone|od)/i.test(ua) &&
        /Safari/i.test(ua) &&
        !/CriOS|FxiOS|EdgiOS|Line/i.test(ua);

    return { name, os, ua, lower, keyword, isSafariMobile };
}

/**
 * モバイル端末かどうかを判定する
 * @returns {boolean}
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * ブラウザ情報をコンソールにスタイリッシュに出力する
 */
function logBrowserInfo() {
    const { name, os, ua, lower, keyword, isSafariMobile } = getBrowserData();

    // --- ログ表示 (複数ハイライト + バージョン黄色) ---
    console.log(`%c[Device] ${os}`, 'color: #27ae60; font-weight: bold;');
    let format = `%c[Browser: ${name}] `;
    let styles = ['color: #73AFCE; font-weight: bold;'];

    const osLower = os.toLowerCase();
    let i = 0;
    while (i < ua.length) {
        const restLower = lower.slice(i);

        // OSを緑でハイライト
        if (os !== "Unknown OS" && restLower.startsWith(osLower)) {
            format += `%c${ua.slice(i, i + osLower.length)}`;
            styles.push('color: #27ae60; font-weight: bold;');
            i += osLower.length;
            continue;
        }

        if (keyword && restLower.startsWith(keyword)) {
            format += `%c${ua.slice(i, i + keyword.length)}`;
            styles.push('color: red; font-weight: bold;');
            i += keyword.length;
            continue;
        }
        const versionMatch = restLower.match(/^\/\d+(\.\d+)*/);
        if (versionMatch) {
            const ver = ua.slice(i, i + versionMatch[0].length);
            format += `%c${ver}`;
            styles.push('color: yellow; font-weight: bold;');
            i += versionMatch[0].length;
            continue;
        }
        format += `%c${ua[i]}`;
        styles.push('color: #4e778b;');
        i++;
    }

    console.log(format, ...styles);
    console.log(`%c[Browser] Safari Mobile: ${isSafariMobile}`, 'color: #73AFCE;');
}

