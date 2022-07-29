import { Guild } from "@oasisjs/biscuit/biscuit";
import { Events, Plugin, PluginConfig } from "src/plugins/plugins";

const ONE_DAY = 24 * 3600 * 1000; // milliseconds in a day

export const Event = new class implements Plugin {
    config: PluginConfig = { name: 'Change Guild Icon' }
    type: Events = 'guildCreate';
    guildId: string = '973427352560365658';
    images: string[] = [
        'https://i.imgur.com/fHWZEZK.png',
        'https://i.imgur.com/nQHBa3I.png',
        'https://i.imgur.com/5pEGDXx.png',
        'https://i.imgur.com/ntOpVpP.png',
        'https://i.imgur.com/tPS4DAg.png',
        'https://i.imgur.com/HYT7Ouv.png',
        'https://i.imgur.com/odzUSfQ.png',
        'https://i.imgur.com/zlCr3No.png',
        'https://i.imgur.com/agZ4vZW.jpeg'
    ];

    async trigger(guild: Guild) {
        if (guild.id === this.guildId) {
            const image = this.selectImage();

            setInterval(async () => {
                const url = image();
                await guild.edit({ icon: url })
            }, ONE_DAY);
        }
    }

    selectImage(): () => string {
        let i: number = 0;
    
        return function(){
            i++;
            if (i == this.images.length ) {
                i = 0;
            }
    
            return this.images[i];
        }
    }
}

export default Event;