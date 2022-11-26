export class Budget {

    //Properties
    private _budget_name!: string;
    private _user_name!: string;
    private _services_selected!: string[];
    private _total_price!: number;
    private _date!: Date;

    /**
     * 
     * @param {string} budget_name
     * @param {string} user_name
     * @param {string[]} services_selected
     * @param {number} total_price
     * @param {Date} date
     */
    constructor(budget_name?: string, user_name?: string, services_selected?: string[], total_price?: number, date?: Date) {

        if (budget_name != undefined) {
            this._budget_name = budget_name;
        }
        if (user_name != undefined) {
            this._user_name = user_name;
        }
        if (services_selected != undefined) {
            this._services_selected = services_selected;
        }
        if (total_price != undefined) {
            this._total_price = total_price;
        }
        if (date != undefined) {
            this._date = date;
        }
    }

    /**
     * Getter budget_name
     * @return {string}
     */
    public get budget_name(): string {
        return this._budget_name;
    }

    /**
     * Setter budget_name
     * @param {string} value
     */
    public set budget_name(value: string) {
        this._budget_name = value;
    }

    /**
     * Getter user_name
     * @return {string}
     */
    public get user_name(): string {
        return this._user_name;
    }

    /**
     * Setter user_name
     * @param {string} value
     */
    public set user_name(value: string) {
        this._user_name = value;
    }

    /**
     * Getter services_selected
     * @return {string[]}
     */
    public get services_selected(): string[] {
        return this._services_selected;
    }

    /**
     * Setter services_selected
     * @param {string[]} value
     */
    public set services_selected(value: string[]) {
        this._services_selected = value;
    }

    /**
     * Getter total_price
     * @return {number}
     */
    public get total_price(): number {
        return this._total_price;
    }

    /**
     * Setter total_price
     * @param {number} value
     */
    public set total_price(value: number) {
        this._total_price = value;
    }

    /**
    * Getter date
    * @return {Date}
    */
    public get date(): Date {
        return this._date;
    }

    /**
     * Setter date
     * @param {Date} value
     */
    public set date(value: Date) {
        this._date = value;
    }
}
