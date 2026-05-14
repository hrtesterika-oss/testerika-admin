import { useEffect, useState } from 'react'
import Select from 'react-select'
import 'react-quill/dist/quill.snow.css';
import "./index.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp';
import { createUser, getQuestionDetailsusingQuestionbankIdANdQuestionId, getQuestionUsingQuestionBankIdAndLanguage, updateUser } from '../users-list/core/_requests';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UploadQuestionsThroughExcelSheet from '../UploadQuestionsThroughExcelSheet';
import JoditEditor from 'jodit-react';
const languageCode: any[] = [{ label: "Hindi", value: "hi" }, { label: "Sanskrit", value: "sa" }, { label: "Tamil", value: "ta" }, { label: "Telugu", value: "te" }, { label: "Urdu", value: "ur" }, { label: "Catalan", value: "ca" }, { label: "Chinese", value: "zh" }, { label: "German", value: "de" }, { label: "Russian", value: "ru" }]
let optionsLanguageAll = [{ label: "Hindi", value: "Hindi" }, { label: "Sanskrit", value: "Sanskrit" }, { label: "Tamil", value: "Tamil" }, { label: "Telugu", value: "Telugu" }, { label: "Urdu", value: "Urdu" }, { label: "Catalan", value: "Catalan" }, { label: "Chinese", value: "Chinese" }, { label: "German", value: "German" }, { label: "Russian", value: "Russian" }]
let optionsLanguage = [{ label: "Hindi", value: "Hindi" }, { label: "Sanskrit", value: "Sanskrit" }, { label: "Tamil", value: "Tamil" }, { label: "Telugu", value: "Telugu" }, { label: "Urdu", value: "Urdu" }, { label: "Catalan", value: "Catalan" }, { label: "Chinese", value: "Chinese" }, { label: "German", value: "German" }, { label: "Russian", value: "Russian" }]

const AddEditPassages = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(false)
    const [latestLanguage, setLatestLanguage] = useState({ label: "Hindi", value: "Hindi" })
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(false)

    const [disabledButton, setDisabledButton] = useState(false)
    const params = useParams()
    const [questionsData, setQuestionsData] = useState<any>({
        language: { value: "English", label: "English" },
        passage: {
            id: undefined,
            passage_bank_id: undefined,
            passage: ""
        }
    })
    const [questionsData2, setQuestionsData2] = useState<any>({
        language: { value: "Hindi", label: "Hindi" },
        passage: {
            id: undefined,
            passage_bank_id: undefined,
            passage: ""
        }
    })

    const [to, setTo] = useState('hi');
    const { staffPermission, navItem } = useSelector((state: any) => state.reducerData)
    const [permissionList, setPermissionList] = useState<any>({})
    const filterStaffPermission = async (title: string) => {
        let result = staffPermission.filter((item: any) => item.permission_name === title && item)
        setPermissionList(result[0])
    }
    useEffect(() => {
        filterStaffPermission(navItem?.item)
    }, [navItem])

    const translate = async (text: string, type: string, code: string) => {
        const lang = languageCode.find((item: any) => item.value === code)
        setQuestionsData2({ ...questionsData2, language: { value: lang.label, label: lang.label } })
        const sourceLanguage = "en";
        const targetLanguage = code;

        const url =
            "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
            sourceLanguage +
            "&tl=" +
            targetLanguage +
            "&dt=t&q=" +
            encodeURI(text);

        const result = await fetch(url);
        const json = await result.json();

        try {
            if (type === "Passage")
                setQuestionsData2({ ...questionsData2, passage: { ...questionsData2?.passage, passage: json[0][0][0] } })
        } catch (error) {
            return error;
        }
    };

    //    useEffect(() => {
    //      axios
    //        .get('/languages', {
    //          headers: { 'mode': 'cors', accept: 'application/json' },
    //        })
    //        .then((res) => {
    //         let data=res?.data
    //         console.log(data,"languiage")
    //        });
    //    }, []);


    const getPassageDetails = async () => {
        const { data } = await getQuestionDetailsusingQuestionbankIdANdQuestionId(Number(params?.passageBankId))
        let result = { ...data?.data }
        result?.passages?.map((item: any, index: any) => {
            if (item?.language === "English") {
                let ques = item
                setQuestionsData({
                    language: { value: "English", label: "English" },
                    passage: {
                        id: ques.id,
                        passage_bank_id: ques.passage_bank_id,
                        passage: ques.passage
                    }
                })
            } 
           
        })
    }


    const filterDataUsinglanguage = async (e: { label: string, value: string }) => {
        const { data } = await getQuestionUsingQuestionBankIdAndLanguage(params?.passageBankId, e.label)
        let result = data.data
        if (result?.id) {
            let temp = {
                passage: result?.passage ? result?.passage : "",
                id: result?.id,
                passage_bank_id: result?.passage_bank_id
            }
            setLatestLanguage(e)
            setQuestionsData2({
                language: e,
                passage: temp
            })


            setTimeout(() => {
                setLoad(false)
            }, 1200)
        } else {
            setLatestLanguage(e)
            setQuestionsData2({
                language: e,
                passage: {
                    id: undefined,
                    passage_bank_id: params?.passageBankId ? params?.passageBankId : undefined,
                    passage: ""
                }
            })
            setTimeout(() => {
                setLoad(false)
            }, 300)
        }

    }

    const updatePassageDetails = async (passageBankId: any, passageId: any) => {
        // if (!questionsData.passage.passage.replace(/(<([^>]+)>)/ig, '')?.trim()) {
        //     errrorMessage("Please write passage")
        // } else {
            const questionBank = {
                passageDetail: questionsData
            }
            const { data } = await updateUser(passageBankId, passageId, { ...questionBank })
            successMessage("Passage Updated successfully")
        // }
    }

    const updatePassageDetails2 = async (passageBankId: any, passageId: any) => {
        // if (!questionsData2.passage.passage.replace(/(<([^>]+)>)/ig, '')?.trim()) {
        //     errrorMessage("Please write passage")
        // } else {
            // if (!questionsData.passage.passage.replace(/(<([^>]+)>)/ig, '')?.trim()) {
            //     errrorMessage("Please write passage")
            // } else {
                const questionBank = {
                    passageDetail: {
                        ...questionsData2,
                        language:latestLanguage
                    }
                }
                const { data } = await updateUser(passageBankId, passageId, { ...questionBank })
                successMessage("Passage Updated successfully")
        //     }
        // }
    }


    const savePassageBank = async () => {
        // if (!questionsData.passage.passage.replace(/(<([^>]+)>)/ig, '')?.trim()) {
        //     errrorMessage("Please write passage")
        // } else {
            let { data } = await createUser({
                id: questionsData?.passage?.passage_bank_id,
                passageDetail: questionsData
            })
            if (data?.success) {
                setQuestionsData({
                    language: { value: "English", label: "English" },
                    passage: {
                        id: data?.data?.passage?.id,
                        passage_bank_id: data?.data?.id,
                        passage: data?.data?.passage?.passage
                    }
                })
                if (!params.passageBankId) {
                    setDisabledButton(true)
                }
                successMessage("Passage saved successfully")
            } else {
                errrorMessage("Something went wrong")
            }
        // }
    }

    const savePassageBank2 = async () => {
        // if (!questionsData2.passage.passage.replace(/(<([^>]+)>)/ig, '')?.trim()) {
        //     errrorMessage("Please write passage")
        // } else {
            let { data } = await createUser({
                id: questionsData?.passage?.passage_bank_id,
                passageDetail: {
                    ...questionsData2,
                    language:latestLanguage
                }
            })
            if (data?.success) {
                successMessage("Passage saved successfully")
            } else {
                errrorMessage("Something went wrong")
            }
        // }
    }
    
    useEffect(() => {
        optionsLanguage = optionsLanguageAll
        if (params?.passageBankId)
            getPassageDetails()
    }, [params])

    return (
        <div className='container mb-5'>
            <div className="row">
                {loading? <p>Loading....</p> :<div className="col-12 my-4">
                    <div className="my-5 row ">
                           {!params?.passageBankId &&  <div className='d-flex justify-content-end my-3'>
                                <button className='btn btn-primary' onClick={()=>{
                                    setLoading(true)
                                     setQuestionsData({
                                        language: { value: "English", label: "English" },
                                        passage: {
                                            id: undefined,
                                            passage_bank_id: undefined,
                                            passage: ""
                                        }
                                    })
                                    setQuestionsData2({
                                        language: { value: "Hindi", label: "Hindi" },
                                        passage: {
                                            id: undefined,
                                            passage_bank_id: undefined,
                                            passage: ""
                                        }
                                    })
                                    setSelectedLanguage(false)
                                    setLatestLanguage({ label: "Hindi", value: "Hindi" })
                                    setDisabledButton(false)
                                    setTimeout(()=>{
                                        setLoading(false)
                                    },1000)
                                }}>Add More Passage</button>
                            </div>}
                            <div className="row">
                                <div className="col-6" style={{ borderRight: "2px solid black", minHeight: "100vh" }}>
                                    <h3 className="py-7">Language : <span className="text-primary">English</span></h3>
                                    <hr />
                                    <form>
                                        <div className="col-12">
                                            <label className='d-flex align-items-center form-label required text-primary'>Passage</label>
                                            {/* <ReactQuill theme="snow" modules={modules} value={questionsData?.passage?.passage} onChange={(e:any)=>{
                                       setQuestionsData({...questionsData,passage:{...questionsData?.passage,passage:e}})
                                       translate(e.replace( /(<([^>]+)>)/ig, ''),"Question",to)
                                    }} /> */}
                                            <JoditEditor
                                                value={questionsData?.passage?.passage}
                                                onChange={(e: any) => {
                                                    setQuestionsData({ ...questionsData, passage: { ...questionsData?.passage, passage: e } })
                                                    // translate(e.replace(/(<([^>]+)>)/ig, ''), "Passage", to)
                                                }}
                                            />
                                        </div>
                                        <hr />

                                        <div className={"d-flex justify-content-end"}>
                                            <button disabled={disabledButton ? true : false} className="btn w-25 h-75 btn-success" onClick={(e: any) => {
                                                e?.preventDefault()
                                                if (params?.passageBankId) {
                                                    permissionList?.can_edit && updatePassageDetails(params?.passageBankId, questionsData?.passage?.id)
                                                } else {
                                                    permissionList?.can_create && savePassageBank()
                                                    // language.push(latestLanguage?.value)
                                                }
                                            }}>
                                                Save
                                            </button>
                                        </div>


                                    </form>
                                </div>
                                <div className="col-6">
                                    <div className="col-12 d-flex justify-content-end">
                                        <div className="w-50">
                                            <label className='form-label required text-primary'>Select Language</label>
                                            <Select className="" options={optionsLanguage} value={latestLanguage} onChange={(e: any) => {
                                                setSelectedLanguage(true)
                                                setLatestLanguage(e)
                                                setQuestionsData2({ ...questionsData2, language: e })
                                                let lang = languageCode.find((item: any) => item.label === e.label)
                                                setTo(lang.value)
                                                // if (!params?.passageBankId) {
                                                //     if (questionsData?.passage?.passage?.replace(/(<([^>]+)>)/ig, '') !== "")
                                                //         translate(questionsData?.passage?.passage?.replace(/(<([^>]+)>)/ig, ''), "Passage", lang.value)
                                                // }
                                                if (params?.passageBankId) {
                                                    setLoad(true)
                                                    filterDataUsinglanguage(e)
                                                }
                                            }} />
                                        </div>
                                    </div>
                                    <hr />
                                    {
                                        selectedLanguage &&
                                        <>
                                            {
                                                load ? <p><Skeleton count={7} style={{ height: "80px" }} className="bg-secondary" /></p> : <form>
                                                    <div className="col-12">
                                                        <label className='d-flex align-items-center form-label required text-primary'>Passage</label>
                                                        <JoditEditor value={questionsData2?.passage?.passage} onChange={(e: any) => {
                                                            setQuestionsData2({ ...questionsData2, passage: { ...questionsData2.passage, passage: e } })
                                                        }} />
                                                    </div>
                                                    <hr />


                                                    <div className={"d-flex justify-content-end"}>
                                                        <button className="btn w-25 h-75 btn-success" onClick={(e: any) => {
                                                            e?.preventDefault()
                                                            if (params?.passageBankId) {
                                                                // console.log
                                                                if(questionsData2?.passage?.id && questionsData2?.passage?.passage_bank_id ){
                                                                    permissionList?.can_edit && updatePassageDetails2(params?.passageBankId, questionsData2?.passage?.id)
                                                                }else{
                                                                    permissionList?.can_create && savePassageBank2()
                                                                }
                                                            } else {
                                                                permissionList?.can_create && savePassageBank2()
                                                                // language.push(latestLanguage?.value)
                                                            }
                                                        }}>
                                                            Save
                                                        </button>
                                                    </div>


                                                </form>
                                            }
                                        </>

                                    }
                                </div>
                            </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default AddEditPassages