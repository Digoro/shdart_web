
export class Message {
    constructor(
        public role: 'model' | 'user' | 'question',
        public parts: { text: string }[]
    ) { }
}