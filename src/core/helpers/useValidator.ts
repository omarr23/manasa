import { useI18n } from "vue-i18n";

export function useValidator() {
    const { t } = useI18n();
    const checkAr = (rule: any, value: any, callback: any) => {
        if (value === '' || value === undefined) {
            callback()
        } else {
            if (!/^[\u0600-\u06FF\s0-9]+$/.test(value)) {
                callback(new Error("This field must contain Arabic characters and numbers only"));
            }
            callback()
        }
    }
    const checkEn = (rule: any, value: any, callback: any) => {
        if (value === '' || value === undefined) {
            callback()
        } else {
            if (!/^[a-zA-Z\s0-9]+$/.test(value)) {
                callback(new Error(t('validation.en_rule')));
            }
            callback()
        }
    }
   
    return { checkAr,  checkEn };
}