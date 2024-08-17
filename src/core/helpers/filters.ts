const filters = {
    FormatDate(input: string) {
        const date = new Date(input);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },
    FormatDateTime(input: string) {
        const date = new Date(input);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    FormatTime(input: string) {
        const date = new Date(input);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    },
    ConvertCamelToTitleName(input: string) {
        if (input) {
          const result = input.replace(/([A-Z])/g, '$1')
          const convertCamel = result.charAt(0).toUpperCase() + result.slice(1)
          const convertSnake = convertCamel.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
            c ? c.toUpperCase() : ' ' + d.toUpperCase()
          )

          return convertSnake
        }
      }
};

export default filters;
