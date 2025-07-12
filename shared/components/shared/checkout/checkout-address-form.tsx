import { FormInput } from "../form-components/form-input"
import { Textarea } from "../../ui/textarea"
import { WhiteBlock } from "../white-block"
import { FormTextarea } from "../form-components/form-textarea"

interface Props {
    className?:string
}

export const CheckoutAddressForm:React.FC<Props> = ({className}) => {
    return (
        <WhiteBlock title="3. Delivery address" className={className}>
            <div className="flex flex-col gap-5">
                <FormInput name='address' className="text-base" placeholder="Your address"/>

                <FormTextarea name='comment' rows={5} className="text-base" placeholder="Comment on the order"/>
            </div>
        </WhiteBlock>
    )
}