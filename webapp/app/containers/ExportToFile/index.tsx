
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { RouteComponentWithParams } from 'utils/types'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import { makeSelectCurrentProject, } from 'containers/Projects/selectors'
import { isEmpty, isString } from 'lodash'


import { makeSelectPortals, makeSelectLoading, makeSelectExportSuccess } from './selectors'
import ModulePermission from 'containers/Account/components/checkModulePermission'
import { initializePermission } from 'containers/Account/components/checkUtilPermission'

import { useTablePagination } from 'utils/hooks'

import reducer from './reducer'
import saga from './sagas'
import { ExportToFileActions } from './actions'

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
    Checkbox,
    Divider,
    Result
} from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { ColumnProps } from 'antd/lib/table'
import Container, { ContainerTitle, ContainerBody } from 'components/Container'
import Box from 'components/Box'

const CheckboxGroup = Checkbox.Group;
let plainOptions = [];
let defaultCheckedList = [];


// import { makeSelectPortals, makeSelectLoading } from './selectors'
// import { ImportByFileActions } from './actions'
// import reducer from './reducer'
// import saga from './sagas'


// import { IPortal } from './types'
import { IProject } from 'containers/Projects/types'

import utilStyles from 'assets/less/util.less'
import { IPortal, IExportDto } from './types'
// import Styles from './Schedule.less'
const { Option } = Select;

interface IExportToFileStateProps {
    portals: IPortal[],
    exportSuccess: boolean,
    onLoadPortals: (id: number) => any,
    onExportReport: (id: number, exportDto: IExportDto) => any,
    resetExportSuccessStatus: () => void
}

type ExportToFileProps = IExportToFileStateProps & RouteComponentWithParams

const ExportMain: React.FC<ExportToFileProps> = (props) => {

    const {
        match,
        portals,
        exportSuccess,
        onLoadPortals,
        onExportReport,
        resetExportSuccessStatus
    } = props

    plainOptions = portals.map(_item => ({ label: _item.name, value: _item.id }))
    console.log('plainOptions ;', plainOptions)
    let allPortalsIds = portals.map(_item => _item.id)

    const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);

    console.log('portals:', portals);
    useEffect(() => {
        // console.log('useEffect:', match.params.projectId)
        resetExportSuccessStatus()
        onLoadPortals(+match.params.projectId)
    }, [])

    const onChange = list => {
        console.log('onChange check all list:', list)

        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? allPortalsIds : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <Container>
            <Helmet title="ExportToFile"></Helmet>
            <ContainerBody>
                <Box>
                    <Box.Header>
                        <Box.Title>
                            導出報表
            </Box.Title>
                        <Box.Tools>
                        </Box.Tools>
                    </Box.Header>
                    <Box.Body>
                        { !exportSuccess && <Row>
                            <Col span={24}>
                                <br />

                                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                    全選
                                </Checkbox>
                                <Divider />
                                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />

                                <br />
                                <br />

                                <Button type='primary' disabled={checkedList.length <= 0} onClick={() => {
                                    const exportReportList = checkedList
                                    console.log('click 導出:', checkedList, 'exportReportList:', exportReportList)
                                    onExportReport(+match.params.projectId, exportReportList)
                                }}>導出</Button>

                                <br />
                                <br />
                            </Col>
                        </Row>}
                        {exportSuccess && <Result status="success" title="導出成功，請到右上角下載中心下載" extra={[
                            <Button type="primary" key="console" onClick={() => {
                                resetExportSuccessStatus()
                            }}> 返回 </Button>
                        ]} />}
                    </Box.Body>
                </Box>
            </ContainerBody>
        </Container>
    )

}


// todo: tofix cannot pass state to selector
const mapStateToProps = createStructuredSelector({
    portals: makeSelectPortals(),
    exportSuccess: makeSelectExportSuccess(),
    currentProject: makeSelectCurrentProject(),
    loading: makeSelectLoading()
})

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPortals: (projectId) => dispatch(ExportToFileActions.loadPortals(projectId)),
        onExportReport: (projectId, importDto) => dispatch(ExportToFileActions.exportReport(projectId, importDto)),
        resetExportSuccessStatus: () => dispatch(ExportToFileActions.resetExportSuccessStatus())
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

const withReducer = injectReducer({ key: 'exportToFile', reducer })
const withSaga = injectSaga({ key: 'exportToFile', saga })

export default compose(
    withReducer,
    withSaga,
    withConnect
)(ExportMain)