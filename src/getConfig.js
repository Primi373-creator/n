import 'dotenv/config'
const getConfig = () => {
    return {
        name: process.env.NAME || 'Shadow',
        session: process.env.SESSION || 'session-devityiy4',
        prefix: process.env.PREFIX || '#',
        port: process.env.PORT || 3000,
        imgbb: process.env.IMGBB,
        chatboturi: process.env.BRAINSHOP || '159501,6pq8dPiYt7PdqHz3',
        mongo: process.env.MONGO || 'mongodb+srv://Arch:1t6l2G0r6nagLlOb@cluster0.gedh4.mongodb.net/?retryWrites=true&w=majority',
        mods: process.env.MODS
            ? process.env.MODS.split('2349150690169,2349067654525').map((id) => {
                  if (id.endsWith('@s.whatsapp.net')) return id
                  return id.replace('+', '').concat('@s.whatsapp.net')
              })
            : []
    }
}

export default getConfig
