export type createNewUser={
    first_name:string,
    last_name:string,
    password:string,
    phone_number:string,
    email:string,
}

export type createNewPlan={
    name:string,
    description:string,
    event_per_month:string,
    participant_per_event:number,
    monthly_price:number,
    yearly_price:number,
    support:string,
    logo_customization:string,
    custom_url:string,
    share_result:string,
    email_result:string,
    export_result:string,
    planCategory_id:number,
    popular_plan?:boolean,
    free_plan?:boolean,
    free_trial_count_limit?:number
}

export type faqType={
    id:number,
    question:string,
    answer:string,
    active:number,
    createdAt?:string,
    deletedAt?:string,
    updatedAt?:string
}