import { useState } from "react"
import { Button, Input, Radio, message } from "antd"
import {
    CheckOutlined,
    CloseOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons'
import {
    useApproveAdvertisement,
    useRejectAdvertisement,
    useRequestChangesAdvertisement,
    type Reason
} from "@/entities/advertisement"

const { TextArea } = Input

const ModerationBlock = ({ id }: { id: string }) => {

    const [messageApi, contextHolder] = message.useMessage()
    const [comment, setComment] = useState("")
    const [reason, setReason] = useState<Reason | "">("")
    const [otherReason, setOtherReason] = useState("")



    const { mutate: approveAds, isPending: isMutatingApprove } = useApproveAdvertisement()
    const { mutate: rejectAds, isPending: isMutatingReject } = useRejectAdvertisement()
    const { mutate: requestChangesAds, isPending: isMutatingRequestChanges } = useRequestChangesAdvertisement()

    const isMutating = isMutatingApprove || isMutatingReject || isMutatingRequestChanges

    const approveHandler = () => {
        approveAds(
            { id: id },
            {
                onSuccess: (res) => {
                    console.log(res)
                },
                onError: (res) => {
                    console.log(res)
                }
            }
        )
    }

    const rejectHandler = () => {
        if (comment === "" || reason === "" || ( reason === "Другое" && otherReason === "" ) ) {
            messageApi.open({
                type: 'error',
                content: 'Укажите комментарий и причину',

            })
            return
        }

        rejectAds(
            {
                id: id,
                params: {
                    reason: reason,
                    comment: comment
                }
            },
            {
                onSuccess: (res) => {
                    console.log(res)
                },
                onError: (res) => {
                    console.log(res)
                }
            }
        )
    }

    const requestChangesHandler = () => {
        if (comment === "" || reason === "" || ( reason === "Другое" && otherReason === "" ) ) {
            messageApi.open({
                type: 'error',
                content: 'Укажите комментарий и причину',

            })
            return
        }
        requestChangesAds(
            {
                id: id,
                params: {
                    reason: reason,
                    comment: comment
                }
            },
            {
                onSuccess: (res) => {
                    console.log(res)
                },
                onError: (res) => {
                    console.log(res)
                }
            }
        )
    }

    return (
        <>
            {contextHolder}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Действия модератора</h2>
                <div className="mb-4">
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Комментарий
                        </label>
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 7 }}
                            placeholder="Добавьте комментарий к решению..."
                            status={comment === "" ? "error" : "validating"}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Причина
                        </label>
                        <div className={`p-2 rounded-md border border-0.5 bg-gray-100 dark:bg-gray-900
                                        ${reason === "" ? "border-[#ff4d4f] dark:border-[#901c22]" : "dark:border-[#434343] border-[#91caff]"}
                                    `}>
                            <Radio.Group
                                vertical
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                options={[
                                    { label: "Зaпрещенный товар", value: "Зaпрещенный товар" },
                                    { label: "Неверная категория", value: "Неверная категория" },
                                    { label: "Некорректное описание", value: "Некорректное описание" },
                                    { label: "Проблемы с фото", value: "Проблемы с фото" },
                                    { label: "Подозрение на мошенничество", value: "Подозрение на мошенничество" },
                                    { label: "Другое", value: "Другое" }
                                ]}
                            />
                            {reason === "Другое" && (
                                <div className="my-2 p-2 rounded-md dark:bg-gray-800">
                                    <Input
                                        placeholder="Укажите причину..."
                                        status={otherReason === "" ? "error" : "validating"}
                                        value={otherReason}
                                        onChange={(e) => setOtherReason(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-3">
                    <Button
                        icon={<CheckOutlined />}
                        size="large"
                        variant="solid"
                        color="green"
                        onClick={approveHandler}
                        disabled={isMutating}
                    >
                        Одобрить
                    </Button>
                    <Button
                        icon={<CloseOutlined />}
                        size="large"
                        variant="solid"
                        color="danger"
                        onClick={rejectHandler}
                        disabled={isMutating}
                    >
                        Отклонить
                    </Button>
                    <Button
                        icon={<ClockCircleOutlined />}
                        size="large"
                        variant="solid"
                        color="primary"
                        onClick={requestChangesHandler}
                        disabled={isMutating}
                    >
                        Отправить на дороботку
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ModerationBlock