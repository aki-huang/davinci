
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { RouteComponentWithParams } from 'utils/types'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import { makeSelectPortals, makeSelectLoading } from './selectors'
import { makeSelectCurrentProject, } from 'containers/Projects/selectors'
import { ImportByFileActions } from './actions'
import reducer from './reducer'
import saga from './sagas'

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
} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/lib/button'
import { ColumnProps } from 'antd/lib/table'
import Container, { ContainerTitle, ContainerBody } from 'components/Container'
import Box from 'components/Box'

// import { ISchedule, JobStatus, IScheduleLoading } from './types'
import { IPortal } from './types'
import { IProject } from 'containers/Projects/types'

import utilStyles from 'assets/less/util.less'
// import Styles from './Schedule.less'

// interface IScheduleListStateProps {
// loading: IScheduleLoading
// portals: IPortal[]
// currentProject: IProject
//   }
interface IImportByFileStateProps {
    portals: IPortal[],
    onLoadPortals: (id: number) => any
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
        onLoadPortals
    } = props
    console.log('portals:', portals);
    console.log('props:', props);

    useEffect(() => {
        // console.log('useEffect:', match.params.projectId)
        // console.log('useEffect:', onLoadPortals(1))
        onLoadPortals(+match.params.projectId)
    }, [])

    // const uploadProps = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //       authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //   };

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          console.log(text)
        //   alert(text)
        };
        reader.readAsText(e.target.files[0])
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
                <input type="file" onChange={(e) => showFile(e)} />
            </ContainerBody>
        </Container>
    )
}


// todo: tofix cannot pass state to selector 
const mapStateToProps = createStructuredSelector({
    portals: makeSelectPortals(),
    currentProject: makeSelectCurrentProject(),
    loading: makeSelectLoading()
})

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPortals: (projectId) => dispatch(ImportByFileActions.loadPortals(projectId)),
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
