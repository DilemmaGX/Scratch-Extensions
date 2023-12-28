const CLID = 'CoLang';
const CLCOV = '';
const CLICON = '';

class CoLang {
    _formatMessage
    runtime
    constructor(runtime) {
        this.runtime = runtime;
        this._formatMessage = runtime.getFormatMessage({
            'zh-cn': {
                'cl.extensionName': '古朗',
                'cl.splitLine': '分割“[end]”敏感的语句[input]',
                'cl.argsLine': '获取[line]的第[n]个[type]的内容'
            },
            en: {
                'cl.extensionName': 'CoLang',
                'cl.splitLine': 'Split"[end]"sensitive script[input]',
                'cl.argsLine': 'Get the arguments of[line]inside[type]No.[n]'
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
                },
                {
                    opcode: 'argsLine',
                    blockType: 'reporter',
                    text: this.formatMessage('cl.argsLine'),
                    arguments: {
                        line: {
                            type: 'string',
                        },
                        n: {
                            type: 'number',
                        },
                        type: {
                            type: 'number',
                            menu: 'TYPE'
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
                ],
                TYPE: [
                    {
                        text: '()',
                        value: 0
                    },
                    {
                        text: '[]',
                        value: 1
                    },
                    {
                        text: '{}',
                        value: 2
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

    argsLine(args) {
        let left = ['(','[','{'];
        let right = [')',']','}'];
        let r = new RegExp(`\\${left[args.type]}([^\\${left[args.type]}\\${right[args.type]}]*)\\${right[args.type]}`, "g");
        let matches = args.line.match(r);
        if (matches && matches.length > args.n){
            let match = matches[args.n];
            console.log(match);
            console.log(match.slice(1,match.length - 1));
            return match.slice(1,match.length - 1);
        } else {
            return "";
        }
    }
}

window.tempExt = {
    Extension: CoLang,
    info: {
        name: 'Ani.extensionName',
        description: 'Ani.description',
        extensionId: CLID,
        iconURL: CLCOV,
        insetIconURL: CLICON,
        featured: true,
        disabled: false,
        doc: "https://learn.ccw.site/article/63a876b1-ccd4-4e74-a298-04e94109ab95",
        collaborator: '官方小傲娇 @ CCW',
        collaboratorURL: 'https://www.ccw.site/student/62f76ddb49c5dc44ac0c03c0',
        collaboratorList: [
            {
                collaborator: '官方小傲娇 @ CCW',
                collaboratorURL: 'https://www.ccw.site/student/62f76ddb49c5dc44ac0c03c0'
            },
        ]
    },
    l10n: {
        'zh-cn': {
            'Ani.extensionName': 'Animator',
            'Ani.description': '让你的角色动起来🏃'
        },
        en: {
            'Ani.extensionName': 'Animator',
            'Ani.description': 'Make your characters move 🏃'
        }
    }
}
