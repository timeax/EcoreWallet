import Text from "@components/Text";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import styles from '@styles/widgets/balance.module.scss'


const TotalWidget: React.FC<TotalWidgetProps> = ({ type, value, currency = 'USD' }) => {
    return (
        <div>
            <div className={"flex gap-2 items-center text-theme-text " + styles.total}>
                {
                    type == 'in'
                        ? <>
                            <span className={styles.icon + ' text-success'}><FaLongArrowAltDown /></span>
                            Income</>
                        : <>
                            <span className={styles.icon + ' text-warning'}><FaLongArrowAltUp /></span>
                            Expenses
                        </>
                }

            </div>
            <Text variant={'text'} className={'flex items-center gap-1 ' + styles.tblances}>
                <span className=''>{currency}</span>
                <span className=''>{value}</span>
            </Text>
        </div>
    )
}


interface TotalWidgetProps {
    type: 'in' | 'out';
    value: string;
    currency?: string
}

export default TotalWidget;

