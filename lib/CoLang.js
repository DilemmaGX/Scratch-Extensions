const CLID = 'CoLang';
const CLCOV = '';
const CLICON = '';

class CodeLang {
    _formatMessage
    runtime
    constructor(runtime) {
        this.runtime = runtime;
        this._formatMessage = runtime.getFormatMessage({
            'zh-cn': {
                'cl.extensionName': '古朗',
                'cl.splitLine': '分割[end]敏感语句[input]'
            },
            en: {
                'cl.extensionName': 'CoLang',
                'cl.splitLine': 'Split[end]sensitive script[input]'
            }
        })
    }
    formatMessage(id) {
        return this._formatMessage({
            id,
            default: id,
            description: id
        })
    }
    getInfo() {
        return {
            id: CLID,
            name: this.formatMessage('cl.extensionName'),
            color1: '#8A3232',
            menuIconURI: CLICON,
            blockIconURI: CLICON,
            blocks: [
                {
                    opcode: 'splitLine',
                    blockType: 'reporter',
                    text: this.formatMessage('cl.splitLine'),
                    arguments: {
                        end: {
                            type: 'string',
                            menu: 'END'
                        },
                        input: {
                            type: 'string'
                        }
                    },
                    disableMonitor: true
                }
            ],
            menus: {
                END: [
                    {
                        text: ';',
                        value: ';'
                    },
                    {
                        text: '\\',
                        value: '\\'
                    },
                    {
                        text: ',',
                        value: ','
                    },
                    {
                        text: 'Enter',
                        value: '\n'
                    },
                ]
            }
        }
    }

    /**
     * 将输入字符串按照指定的分隔符进行分割，并将结果转换为 JSON 字符串。
     * @param {Object} args - 包含以下属性的对象：
     *   @property {string} args.input - 需要分割的输入字符串。
     *   @property {string} args.end - 用于分割输入字符串的分隔符。
     * @returns {string} 返回分割后的字符串组成的 JSON 字符串。
     */
    splitLine(args) {
      return JSON.stringify(args.input.split(args.end));
    }
}