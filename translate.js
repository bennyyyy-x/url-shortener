const url_chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function hex_to_url(hex) {
    var value = parseInt(hex, 16);
    var url = "";
    while (value != 0) {
        var rem = value % 62;
        value = Math.floor(value / 62);
        url = url_chars.substring(rem, rem + 1) + url;
    }
    return url;
}

function url_to_hex(url) {
    var value = 0;
    for (let i = 0; i < url.length; i++) {
        value += (62 ** i) * url_chars.indexOf(url.substring(url.length - i - 1, url.length - i));
    }
    return value.toString(16);
}

exports.hex_to_url = hex_to_url;
exports.url_to_hex = url_to_hex;