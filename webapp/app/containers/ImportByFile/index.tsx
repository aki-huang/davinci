
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { RouteComponentWithParams } from 'utils/types'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import { makeSelectPortals, makeSelectLoading, makeSelectSources } from './selectors'
import { makeSelectCurrentProject, } from 'containers/Projects/selectors'
import { ImportByFileActions } from './actions'
import reducer from './reducer'
import saga from './sagas'

import { isEmpty, isString } from 'lodash'

import ModulePermission from 'containers/Account/components/checkModulePermission'
import { initializePermission } from 'containers/Account/components/checkUtilPermission'

import { useTablePagination } from 'utils/hooks'

import {
    Row,
    Col,
    Breadcrumb,
    Table,
    Icon,
    Button,
    Tooltip,
    Popconfirm,
    message,
    Modal,
    Upload,
    Select,
} from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { ColumnProps } from 'antd/lib/table'
import Container, { ContainerTitle, ContainerBody } from 'components/Container'
import Box from 'components/Box'

// import { ISchedule, JobStatus, IScheduleLoading } from './types'
import { IPortal, ISourceBase } from './types'
import { IProject } from 'containers/Projects/types'

import utilStyles from 'assets/less/util.less'
// import Styles from './Schedule.less'
const { Option } = Select;


// interface IScheduleListStateProps {
// loading: IScheduleLoading
// portals: IPortal[]
// currentProject: IProject
//   }
interface IImportByFileStateProps {
    portals: IPortal[],
    sources: ISourceBase[],
    onLoadPortals: (id: number) => any,
    onLoadSources: (id: number) => any,
    onImportReport: (id: number, dto: object) => any
}

//   interface IScheduleListDispatchProps {
//     onLoadSchedules: (projectId: number) => any
//     onDeleteSchedule: (id: number) => any
//     onChangeScheduleJobStatus: (id: number, status: JobStatus) => any
//     onExecuteScheduleImmediately: (id: number, resolve: () => void) => any
//   }

type ImportByFileProps = IImportByFileStateProps &
    //   IScheduleListDispatchProps &
    RouteComponentWithParams

// type ImportByFileProps = IImportByFileStateProps


const ImportMain: React.FC<ImportByFileProps> = (props) => {

    const {
        match,
        portals,
        sources,
        onLoadPortals,
        onLoadSources,
        onImportReport
    } = props
    console.log('sources:', sources);
    console.log('props:', props);
    // const [viewList, setViewList] = useState([])
    const [jsonObj, setJsonObj] = useState([])

    useEffect(() => {
        // console.log('useEffect:', match.params.projectId)
        console.log('useEffect:', onLoadSources(1))
        // onLoadPortals(+match.params.projectId)
        onLoadSources(+match.params.projectId)
    }, [])

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            if (isString(text)) {
                let fileObj = JSON.parse(text)
                setJsonObj(fileObj)
                // console.log(typeof fileObj)
                // console.log(fileObj['views'])
                // if (!isEmpty(fileObj['views'])) {
                //     setViewList(fileObj['views'])
                // }

            } else {
                console.log('文件讀取結果不是string')
            }
        };
        reader.readAsText(e.target.files[0])
    }

    function onChange(key, sourceId) {
        console.log(`${key} selected ${sourceId}`);
        let tempJsonObj = jsonObj;
        tempJsonObj['views'][key]['source'] = sources.find(item => item.id === sourceId)
        tempJsonObj['views'][key]['sourceId'] = sourceId
        console.log('tempJSonObj:', tempJsonObj)
        setJsonObj(tempJsonObj)
    }

    return (
        <Container>
            <Helmet title="ImportByFile" />
            <ContainerTitle>
                <Row>
                    <Col span={24}>
                        <Breadcrumb className={utilStyles.breadcrumb}>
                            <Breadcrumb.Item>
                                <Link to="">導入報表</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
            </ContainerTitle>
            <ContainerBody>
                <Box>
                    <Box.Header>
                        <Box.Title>
                            導入報表
            </Box.Title>
                        <Box.Tools>
                            {/* <Tooltip placement="bottom" title="新增">
                <AdminButton type="primary" icon="plus" onClick={addSchedule} />
              </Tooltip> */}
                        </Box.Tools>
                    </Box.Header>
                    <Box.Body>
                        <Row>
                            <Col span={24}>
                                <input type="file" onChange={(e) => showFile(e)} />

                                {
                                    jsonObj&& !isEmpty(jsonObj['views']) && jsonObj['views'].map((viewItem: any, key: number) => {
                                        return (<div key={key}>
                                            <span>{viewItem.name}: </span>

                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="選擇DataSource"
                                                optionFilterProp="children"
                                                onChange={(sourceId) => onChange(key, sourceId)}
                                            // onFocus={onFocus}
                                            // onBlur={onBlur}
                                            // onSearch={onSearch}
                                            // filterOption={(input, option) =>
                                            //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            // }
                                            >
                                                {sources.map(portalItem => (<Option value={portalItem.id}>{portalItem.name}</Option>))}
                                            </Select>
                                        </div>)
                                    })
                                }


                                <Button type='primary' onClick={() => {
                                    console.log('click 導入')
                                    onImportReport(+match.params.projectId, jsonObj)
                                }}>導入</Button>

<br />
                                <br />
                                <br />
                            </Col>
                        </Row>
                    </Box.Body>
                </Box>
            </ContainerBody>
        </Container>
    )
}


// todo: tofix cannot pass state to selector
const mapStateToProps = createStructuredSelector({
    portals: makeSelectPortals(),
    sources: makeSelectSources(),
    currentProject: makeSelectCurrentProject(),
    loading: makeSelectLoading()
})

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPortals: (projectId) => dispatch(ImportByFileActions.loadPortals(projectId)),
        onImportReport: (projectId, importDto) => dispatch(ImportByFileActions.importReport(projectId, importDto)),
        onLoadSources: (projectId: number) =>
            dispatch(ImportByFileActions.loadSources(projectId)),
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

const withReducer = injectReducer({ key: 'importByFile', reducer })
const withSaga = injectSaga({ key: 'importByFile', saga })

export default compose(
    withReducer,
    withSaga,
    withConnect
)(ImportMain)
