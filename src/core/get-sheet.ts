export const ID = '_inlines'
let ssr = {
  data: '',
}

export let getSheet =
  typeof window === 'object'
    ? () => {
        return (
          window[ID] ||
          Object.assign(
            document.head.appendChild(document.createElement('style')),
            {
              innerHTML: ' ',
              id: ID,
            },
          )
        ).firstChild
      }
    : () => ssr
