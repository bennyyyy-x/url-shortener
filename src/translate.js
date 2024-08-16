const url_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function hex_to_url(hex) {
    var Hex = BigInt('0x' + hex);
    var value = BigInt(Hex.toString(10));
    var url = '';
    while (value != 0n) {
        var rem = value % 62n;
        value = value / 62n;
        url = url_chars[rem] + url;
    }
    return url;
}

function url_to_hex(url) {
    var length = BigInt(url.length);
    var value = 0n;
    for (let i = 0n; i < length; i++) {
        var char = url[length - i - 1n];
        value += (62n ** i) * BigInt(url_chars.indexOf(char));
    }
    return value.toString(16);
}

exports.hex_to_url = hex_to_url;
exports.url_to_hex = url_to_hex;
