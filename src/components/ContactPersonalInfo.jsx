export const ContactPersonalInfo = (props) => {
    const { blocks, styles, configPersonalInfo, Trans, Icon, i18n } = props;

    return (
        blocks.map(([key, item], index) => {
            if(!item.display) return null;

            return (
                <div className={styles.contactPersonalInfo} key={index}>
                    <Icon icon={i18n.t(`contact.personal_info.${key}.icon`)} />
                    <h4>
                         <Trans
                             i18nKey={`contact.personal_info.${key}.value`}
                             tOptions={{ val: configPersonalInfo[key] }}
                             components={{
                                 span: <span />,
                                 EmailLink: <a href={`mailto:${configPersonalInfo[key]}`} />,
                                 PhoneLink: <a href={`tel:${configPersonalInfo[key]}`} />,
                                 OpenToWork: <span>{'contact.personal_info.openToWork.value'}</span>
                             }}
                         >
                             {configPersonalInfo[key]}
                         </Trans>
                    </h4>
                </div>
            )
        })
    )
}