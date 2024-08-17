function loadLocaleMessages() {
    const locales = import.meta.globEager('./ar/*.js');
    let messages = {};

    Object.keys(locales).forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
    
            messages[matched[1]] = {
                ...locales[key].default[matched[1]],
            };
        }
    });

    return messages;
}

const arMsgs = loadLocaleMessages();
export default arMsgs;
