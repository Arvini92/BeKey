export class User {
    constructor(
        public name: string = null,
        public email: string = null,
        public age: number = null,
        public balance: string = null,
        public picture: string = null,
        public phone: string = null,
        public address: string = null,
        public tags: string[] = null,
        public about: string = null,
        private registered: string = null,

        private _id?: string,
        private guid?: string,
        private isActive?: boolean,
        private eyeColor?: string,
        private gender?: string,
        private company?: string,
        private latitude?: number,
        private longitude?: number,
    ) {}
}
