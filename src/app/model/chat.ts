
export class Message {
    constructor(
        public role: 'model' | 'user' | 'question' | 'error',
        public parts: { text: string }[]
    ) { }
}