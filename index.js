const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');
const AdapterBaseClient = require('./codelab_adapter_base.js');

// const blockIconURI = require("./icon.svg");
const blockIconURI =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDAgNDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwIDQwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojRDFEMUQxO30NCgkuc3Qxe2ZpbGw6I0JBQkFCQTt9DQoJLnN0MntmaWxsOiNGM0YzRjM7fQ0KCS5zdDN7ZmlsbDojRkZGRkZGO30NCgkuc3Q0e2ZpbGw6IzNBM0EzQTt9DQo8L3N0eWxlPg0KPHRpdGxlPuaJqeWxleaPkuS7tumFjeWbvuiuvuiuoTwvdGl0bGU+DQo8Zz4NCgk8Zz4NCgkJPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoMC4wODgzIC0wLjk5NjEgMC45OTYxIDAuMDg4MyA3LjEwMiA1Ny4yNjY1KSIgY2xhc3M9InN0MCIgY3g9IjM0LjgzIiBjeT0iMjQuNzUiIHJ4PSI2LjAzIiByeT0iMi4xIi8+DQoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMC4zOSwyMy44NWMtMC4xNywxLjU3LTAuNDQsNC41NCwxLjQ5LDYuMTJjMC42MSwwLjUyLDEuODMsMS4yMiwyLjUzLDAuNzljMC44Ny0wLjYxLTAuMjYtMi41MywwLTUuODUNCgkJCWMwLjI2LTMuNTgsMi4wMS01LjI0LDEuMDUtNi4yYy0wLjYxLTAuNjEtMS45Mi0wLjQ0LTIuNzEtMC4wOUMzMC43NCwxOS41NywzMC40OCwyMi4xOSwzMC4zOSwyMy44NXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMDg4MyAtMC45OTYxIDAuOTk2MSAwLjA4ODMgNi43ODExIDU2Ljk0NTYpIiBjbGFzcz0ic3QwIiBjeD0iMzQuNSIgY3k9IjI0Ljc3IiByeD0iNi4wMyIgcnk9IjIuMSIvPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzAuMDQsMjMuODVjLTAuMTcsMS41Ny0wLjQ0LDQuNTQsMS40OSw2LjEyYzAuNjEsMC41MiwxLjgzLDEuMjIsMi41MywwLjc5YzAuODctMC42MS0wLjI2LTIuNTMsMC01Ljg1DQoJCQljMC4yNi0zLjU4LDIuMDEtNS4yNCwxLjA1LTYuMmMtMC42MS0wLjYxLTEuOTItMC40NC0yLjcxLTAuMDlDMzAuNDgsMTkuNTcsMzAuMjIsMjIuMTksMzAuMDQsMjMuODV6Ii8+DQoJPC9nPg0KCTxnPg0KCQk8ZWxsaXBzZSB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5NjEgLTAuMDg4MyAwLjA4ODMgMC45OTYxIC0yLjE2MjkgMC41NTA5KSIgY2xhc3M9InN0MCIgY3g9IjUuMTUiIGN5PSIyNC43MiIgcng9IjIuMSIgcnk9IjYuMDMiLz4NCgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkuNiwyMy44NWMwLjE3LDEuNTcsMC40NCw0LjU0LTEuNDksNi4xMmMtMC42MSwwLjUyLTEuODMsMS4yMi0yLjUzLDAuNzljLTAuODctMC42MSwwLjI2LTIuNTMsMC01Ljg1DQoJCQljLTAuMjYtMy41OC0yLjAxLTUuMjQtMS4wNS02LjJjMC42MS0wLjYxLDEuOTItMC40NCwyLjcxLTAuMDlDOS4yNSwxOS41Nyw5LjUyLDIyLjE5LDkuNiwyMy44NXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk2MSAtMC4wODgzIDAuMDg4MyAwLjk5NjEgLTIuMTYyNSAwLjU1ODcpIiBjbGFzcz0ic3QwIiBjeD0iNS4yMyIgY3k9IjI0LjcyIiByeD0iMi4xIiByeT0iNi4wMyIvPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOS43OCwyMy44NWMwLjE3LDEuNTcsMC40NCw0LjU0LTEuNDksNi4xMmMtMC42MSwwLjUyLTEuODMsMS4yMi0yLjUzLDAuNzljLTAuODctMC42MSwwLjI2LTIuNTMsMC01Ljg1DQoJCQljLTAuMjYtMy41OC0yLjAxLTUuMjQtMS4wNS02LjJjMC42MS0wLjYxLDEuOTItMC40NCwyLjcxLTAuMDlDOS4zNCwxOS41Nyw5LjYsMjIuMTksOS43OCwyMy44NXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMi44OCwzNC4wN2gtNi4yYy01Ljc3LDAtMTAuNDgtNC43Mi0xMC40OC0xMC40OHYtNS45NGMwLTIuMjcsMS44My00LjE5LDQuMTktNC4xOWgxOS4yMg0KCQkJYzIuMSwwLDMuNzYsMS42NiwzLjc2LDMuNzZ2Ni4zOEMzMy4zNiwyOS4zNSwyOC42NSwzNC4wNywyMi44OCwzNC4wN3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTIyLjQ0LDM0LjU5aC01LjE1Yy01LjI0LDAtOS41Mi00LjI4LTkuNTItOS41MnYtNS42OGMwLTIuMDEsMS43NS0zLjc2LDMuODQtMy43NmgxNi45NQ0KCQkJYzEuODMsMCwzLjQxLDEuNDksMy40MSwzLjQxdjYuMTJDMzEuOTcsMzAuNCwyNy42OSwzNC41OSwyMi40NCwzNC41OXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjEzLjYyIiBjeT0iMjMuNzYiIHI9IjMuODQiLz4NCgkJPGNpcmNsZSBjbGFzcz0ic3QzIiBjeD0iMTMuOCIgY3k9IjIzLjc2IiByPSIzLjE0Ii8+DQoJCTxjaXJjbGUgY2xhc3M9InN0NCIgY3g9IjEzLjk3IiBjeT0iMjMuNjgiIHI9IjIuMjciLz4NCgkJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMjYuMiIgY3k9IjIzLjc2IiByPSIzLjg0Ii8+DQoJCTxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjI1Ljk0IiBjeT0iMjMuNzYiIHI9IjMuMTQiLz4NCgkJPGNpcmNsZSBjbGFzcz0ic3Q0IiBjeD0iMjUuNzYiIGN5PSIyMy42OCIgcj0iMi4yNyIvPg0KCQk8Y2lyY2xlIGNsYXNzPSJzdDMiIGN4PSIxMi42NiIgY3k9IjIyLjM2IiByPSIwLjQ0Ii8+DQoJCTxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjI0LjM3IiBjeT0iMjIuMTkiIHI9IjAuNDQiLz4NCgk8L2c+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI0LjI4LDE0LjA3Yy0wLjg3LDIuOC0xLjY2LDUuNDItNC43Miw1LjMzYy0zLjA2LTAuMDktMy44NC0yLjYyLTQuNjMtNS41Yy0wLjYxLTIuMS0xLjc1LTQuNTQtMC4wOS02LjQ2DQoJCQkJYzEuNjYtMS45Miw0LjgtMS45Miw0Ljg5LTEuOTJjMS45MiwwLDMuODQsMC43OSw0Ljk4LDIuMDFDMjYuMzgsOS40NCwyNS4wNywxMS43OSwyNC4yOCwxNC4wN3oiLz4NCgkJPC9nPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAuMzksMTYuNDJjLTIuNjIsMi40NS03LjE2LDIuODgtOC4xMiwxLjQ5Yy0wLjUyLTAuODcsMS4zMS0xLjgzLDIuMS01LjI0YzAuNjEtMi42Mi0wLjA5LTMuNjcsMC42MS00LjE5DQoJCQljMS41Ny0xLjE0LDcuMTYsMi4wMSw2Ljk5LDUuMjRDMzEuOTcsMTUuMDMsMzEuMDEsMTUuOSwzMC4zOSwxNi40MnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkuMDgsMTYuNDJjMi42MiwyLjQ1LDcuMTYsMi44OCw4LjEyLDEuNDljMC41Mi0wLjg3LTEuMzEtMS44My0yLjEtNS4yNEMxNC41LDEwLjA1LDE1LjE5LDksMTQuNSw4LjQ4DQoJCQljLTEuNTctMS4xNC03LjE2LDIuMDEtNi45OSw1LjI0QzcuNTEsMTUuMDMsOC40NywxNS45LDkuMDgsMTYuNDJ6Ii8+DQoJPC9nPg0KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xOS43NCwxOC4zNUwxOS43NCwxOC4zNWMtMC43OSwwLTEuNjYtMC40NC0xLjgzLTEuMTRsLTAuNDQtMS4xNGMtMC41Mi0xLjQsMC40NC0zLjE0LDIuMjctMy4xNGwwLDANCgkJYzEuODMsMCwyLjgsMS43NSwyLjI3LDMuMTRsLTAuNDQsMS4xNEMyMS40LDE3LjkxLDIwLjUyLDE4LjM1LDE5Ljc0LDE4LjM1eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
const menuIconURI = blockIconURI;
/**
 * Enum for button parameter values.
 * @readonly
 * @enum {string}
 */

const NODE_ID = 'eim/node_alphamini';
const HELP_URL = 'https://adapter.codelab.club/extension_guide/alphamini/';

// 翻译
const FormHelp = {
    'en': 'help',
    'zh-cn': '帮助'
};

const FormSetEmitTimeout = {
    'en': 'set wait timeout [emit_timeout]s',
    'zh-cn': '设置等待超时时间[emit_timeout]秒'
};

const FormConnect = {
    'en': 'connect alphamini robot [id] type [robot_type]',
    'zh-cn': '连接悟空机器人[id]类型[robot_type]'
};

const FormDisConnect = {
    'en': 'disconnect',
    'zh-cn': '断开连接'
};

const Form_control_node = {
    'en': '[turn] [node_name]',
    'zh-cn': '[turn] [node_name]'
};

const FormMove = {
    'en': '[step]step(s) [direction]',
    'zh-cn': '向 [direction] 前进 [step]步'
};

const FormSay = {
    'en': 'say [x]',
    'zh-cn': '说[x]'
};

const FormPlayBehavior = {
    'en': 'play behavior [name]',
    'zh-cn': '表演舞蹈 [name]'
};

const FormPlayAction = {
    'en': 'play action [name]',
    'zh-cn': '展示动作 [name]'
};

const FormPlayExpression = {
    'en': 'play expression [name]',
    'zh-cn': '展示表情 [name]'
};

const Form_sendTopicMessageAndWait = {
    'en': 'broadcast [content] and wait',
    'zh-cn': '广播[content]并等待'
};

const Form_sendTopicMessageAndWait_REPORTER = {
    'en': 'broadcast [content] and wait',
    'zh-cn': '广播[content]并等待'
};

const FormGetInfraredDistance = {
    'en': 'get infrared distance',
    'zh-cn': '前方障碍物距离'
};

// face_detect
const FormFaceDetectCount = {
    'en': 'face count',
    'zh-cn': '识别到人脸数量'
};

const FormFaceAnalysis = {
    'en': 'face info',
    'zh-cn': '人脸信息'
};

const FormFaceRecognise = {
    'en': 'face id',
    'zh-cn': '人脸id'
};

class AdapterClient {
    onAdapterPluginMessage (msg) {
        this.node_id = msg.message.payload.node_id;
        if (this.node_id === this.NODE_ID) {
            // json 数据, class

            this.adapter_node_content_hat = msg.message.payload.content;
            this.adapter_node_content_reporter = msg.message.payload.content;
            console.log('content ->', msg.message.payload.content);
        }
    }

    constructor (node_id, help_url) {
        this.NODE_ID = node_id;
        this.HELP_URL = help_url;

        this.emit_timeout = 10000; // ms

        this.adapter_base_client = new AdapterBaseClient(
            null, // onConnect,
            null, // onDisconnect,
            null, // onMessage,
            this.onAdapterPluginMessage.bind(this), // onAdapterPluginMessage,
            null, // update_nodes_status,
            null, // node_statu_change_callback,
            null, // notify_callback,
            null, // error_message_callback,
            null // update_adapter_status
        );
    }

    emit_with_messageid (NODE_ID, content) {
        return this.adapter_base_client.emit_with_messageid(
            NODE_ID,
            content,
            this.emit_timeout
        );
    }
}

class Scratch3AlphaminiBlocks {
    constructor (runtime) {
        this.client = new AdapterClient(NODE_ID, HELP_URL, runtime, this);
    }

    /**
     * The key to load & store a target's test-related state.
     * @type {string}
     */
    static get STATE_KEY () {
        return 'Scratch.alphamini';
    }

    _setLocale () {
        let now_locale = '';
        switch (formatMessage.setup().locale) {
        case 'en':
            now_locale = 'en';
            break;
        case 'zh-cn':
            now_locale = 'zh-cn';
            break;
        default:
            now_locale = 'zh-cn';
            break;
        }
        return now_locale;
    }
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        const the_locale = this._setLocale();
        return {
            id: 'alphamini',
            name: '悟空机器人',
            colour: '#ff641d',
            colourSecondary: '#c94f18',
            colourTertiary: '#c94f18',
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'open_help_url',
                    blockType: BlockType.COMMAND,
                    text: FormHelp[the_locale],
                    arguments: {}
                },
                {
                    opcode: 'set_emit_timeout',
                    blockType: BlockType.COMMAND,
                    text: FormSetEmitTimeout[the_locale],
                    arguments: {
                        emit_timeout: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10.0
                        }
                    }
                },
                {
                    opcode: 'control_node',
                    blockType: BlockType.COMMAND,
                    text: Form_control_node[the_locale],
                    arguments: {
                        turn: {
                            type: ArgumentType.STRING,
                            defaultValue: 'start',
                            menu: 'turn'
                        },
                        node_name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'node_alphamini'
                        }
                    }
                },
                {
                    opcode: 'connect',
                    blockType: BlockType.COMMAND,
                    text: FormConnect[the_locale],
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '00447'
                        },
                        robot_type: {
                            type: ArgumentType.STRING,
                            defaultValue: 'DEDU',
                            menu: 'robot_type'
                        }
                    }
                },
                /*
                {
                  opcode: "disconnect",
                  blockType: BlockType.COMMAND,
                  text: FormDisConnect[the_locale]
               },*/
                // FormDisConnect
                {
                    opcode: 'move',
                    blockType: BlockType.COMMAND,
                    text: FormMove[the_locale],
                    arguments: {
                        step: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        direction: {
                            type: ArgumentType.STRING,
                            defaultValue: 'FORWARD',
                            menu: 'direction'
                        }
                    }
                },
                {
                    opcode: 'say',
                    blockType: BlockType.COMMAND,
                    text: FormSay[the_locale],
                    arguments: {
                        x: {
                            type: ArgumentType.STRING,
                            defaultValue: '你好'
                        }
                    }
                },
                {
                    opcode: 'get_infrared_distance',
                    blockType: BlockType.REPORTER,
                    text: FormGetInfraredDistance[the_locale],
                    arguments: {}
                },
                //
                {
                    opcode: 'get_face_count',
                    blockType: BlockType.REPORTER,
                    text: FormFaceDetectCount[the_locale],
                    arguments: {}
                },
                // face_analysis
                {
                    opcode: 'face_analysis',
                    blockType: BlockType.REPORTER,
                    text: FormFaceAnalysis[the_locale],
                    arguments: {}
                },
                {
                    opcode: 'face_recognise',
                    blockType: BlockType.REPORTER,
                    text: FormFaceRecognise[the_locale],
                    arguments: {}
                },
                //
                {
                    opcode: 'play_behavior',
                    blockType: BlockType.COMMAND,
                    text: FormPlayBehavior[the_locale],
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'custom_0035' // 生日快乐
                        }
                    }
                },
                {
                    opcode: 'play_action',
                    blockType: BlockType.COMMAND,
                    text: FormPlayAction[the_locale],
                    arguments: {
                        name: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '010' // 打招呼
                        }
                    }
                },
                {
                    opcode: 'play_expression',
                    blockType: BlockType.COMMAND,
                    text: FormPlayExpression[the_locale],
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'codemao13' // 疑问
                        }
                    }
                },
                //
                {
                    opcode: 'broadcastTopicMessageAndWait',
                    blockType: BlockType.COMMAND,
                    text: Form_sendTopicMessageAndWait[the_locale],
                    arguments: {
                        content: {
                            type: ArgumentType.STRING,
                            defaultValue:
                                "robot.play_action(action_name='010')"
                        }
                    }
                },
                {
                    opcode: 'broadcastTopicMessageAndWait_REPORTER',
                    blockType: BlockType.REPORTER,
                    text: Form_sendTopicMessageAndWait_REPORTER[the_locale],
                    arguments: {
                        content: {
                            type: ArgumentType.STRING,
                            defaultValue: 'robot.GetActionList()'
                        }
                    }
                }
                /*
                {
                    opcode: "getbattery",
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        default: formatMessage({
                            id: "cxtello.actionMenu.getbattery",
                            default: "get battery",
                            description: "getbattery",
                        }),
                        description: "getbattery",
                    }),
                },*/
            ],
            menus: {
                turn: {
                    acceptReporters: true,
                    items: ['start', 'stop']
                },
                robot_type: {
                    acceptReporters: true,
                    items: ['DEDU', 'MINI']
                },
                direction: {
                    acceptReporters: true,
                    items: ['FORWARD', 'BACKWARD', 'LEFTWARD', 'RIGHTWARD']
                }
            }
        };
    }

    connect (args) {
        const id = args.id;
        const content = `robot.connect("${id}", "${args.robot_type}")`; // todo 兼容旧的
        return this.client.emit_with_messageid(NODE_ID, content); // timeout
    }
    say (args) {
        const x = args.x;
        const content = `robot.say(text="${x}")`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    // 前方障碍物距离 get_infrared_distance
    get_infrared_distance (args) {
        const content = `robot.get_infrared_distance()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    get_face_count (args) {
        const content = `robot.face_detect()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }
    //
    face_analysis (args) {
        const content = `robot.face_analysis()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    face_recognise (args) {
        const content = `robot.face_recognise()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    move (args) {
        // step=1, direction="FORWARD"
        const step = args.step;
        const direction = args.direction;
        const content = `robot.move(${step}, "${direction}")`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_behavior (args) {
        const name = args.name;
        const content = `robot.play_behavior(name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_action (args) {
        const name = args.name;
        const content = `robot.play_action(action_name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_expression (args) {
        const name = args.name;
        const content = `robot.play_expression(express_name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    // broadcast
    broadcastTopicMessageAndWait (args) {
        const node_id = args.node_id;
        const content = args.content;
        return this.client.emit_with_messageid(node_id, content);
    }

    getbattery () {
        return this.client.emit_with_messageid(NODE_ID, 'tello.get_battery()');
    }

    open_help_url (args) {
        window.open(HELP_URL);
    }

    control_node (args) {
        const content = args.turn;
        const node_name = args.node_name;
        return this.client.adapter_base_client.emit_with_messageid_for_control(
            NODE_ID,
            content,
            node_name,
            'node'
        );
    }

    set_emit_timeout (args) {
        const timeout = parseFloat(args.emit_timeout) * 1000;
        this.client.emit_timeout = timeout;
    }

    broadcastTopicMessageAndWait (args) {
        // topic服务于消息功能， node_id承载业务逻辑(extension)
        const content = args.content;
        return this.client.adapter_base_client.emit_with_messageid(
            NODE_ID,
            content
        );
    }

    broadcastTopicMessageAndWait_REPORTER (args) {
        // topic服务于消息功能， node_id承载业务逻辑(extension)
        const content = args.content;
        return this.client.adapter_base_client.emit_with_messageid(
            NODE_ID,
            content
        );
    }
}

module.exports = Scratch3AlphaminiBlocks;
