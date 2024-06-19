
export class Message {
    constructor(
        public role: 'model' | 'user',
        public parts: { text: string }[]
    ) { }
}