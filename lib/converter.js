
const substitutionMap = {
    'හ': 'y',
    'ල': ',',
    ' අ': ' w', 
    // ...
};

export function unicodeToLegacy(text) {
    let result = '';
    let chars = text.split('');

    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        let nextChar = chars[i + 1] || '';

        // 1. කොම්බුව (ෙ) Handling - (Swap Logic)
        if (nextChar === 'ෙ') {
            result += 'f'; // කොම්බුව ඉස්සරහට දානවා
            result += substitutionMap[char] || char; // ඊට පස්සේ අකුර
            i++; // ඊළඟ අකුර (ෙ) ස්කිප් කරනවා (මොකද අපි ඒක process කරල ඉවරයි)
        } 
        // 2. කොම්බුව හා ඇලපිල්ල (ො) Handling - (Split Logic)
        // උදා: ල + ො -> f + , + d
        else if (nextChar === 'ො') {
            result += 'f'; // කොම්බුව
            result += substitutionMap[char] || char; // මැද අකුර
            result += 'd'; // ඇලපිල්ල (FM Abhaya වල 'd' හෝ 'd' වගේ සමාන එකක්)
            i++; 
        }
        // 3. නිකන් අකුරු
        else {
            result += substitutionMap[char] || char;
        }
    }

    return result;
}
