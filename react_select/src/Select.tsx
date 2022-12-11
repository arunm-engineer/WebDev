import style from './Select.module.css';

type SelectOption = {
    value: any,
    label: string
}

type SelectProps = {
    value?: SelectOption,
    options: SelectOption[],
    onChange: (value: SelectOption | undefined) => void
}

export function Select({ value, onChange, options }: SelectProps) {
    return (
        <div tabIndex={0} className={style.container}>
            <span className={style.value}>Value</span>
            <button className={style['clear-btn']}>&times;</button>
            <div className={style.divider}></div>
            <div className={style.caret}></div>
            <ul className={style.options}>
                {
                    options.map(option => {
                        return (
                            <li key={option.label} className={style.option}>
                                {option.value}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}