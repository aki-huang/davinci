
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { RouteComponentWithParams } from 'utils/types'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import { makeSelectCurrentProject } from 'containers/Projects/selectors'
// import { makeSelectLoading, makeSelectSchedules } from './selectors'
// import { ScheduleActions } from './actions'
// import reducer from './reducer'
// import saga from './sagas'

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
  Modal
} from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { ColumnProps } from 'antd/lib/table'
import Container, { ContainerTitle, ContainerBody } from 'components/Container'
import Box from 'components/Box'

// import { ISchedule, JobStatus, IScheduleLoading } from './types'
import { IProject } from 'containers/Projects/types'

import utilStyles from 'assets/less/util.less'
// import Styles from './Schedule.less'

const ImportMain: React.FC<any> = (props) => {

    return (
        <Container>
            <Helmet title="Schedule" />
            <ContainerTitle>
                <Row>
                    <Col span={24}>
                        <Breadcrumb className={utilStyles.breadcrumb}>
                            <Breadcrumb.Item>
                                <Link to="">ImportByFile</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
            </ContainerTitle>
            <ContainerBody>
                <Box>
                    <Box.Header>
                        <Box.Title>
                            <Icon type="bars" />
             import data source 
            </Box.Title>
                        {/* <Box.Tools>
                            <Tooltip placement="bottom" title="新增">
                                <AdminButton type="primary" icon="plus" onClick={addSchedule} />
                            </Tooltip>
                        </Box.Tools> */}
                    </Box.Header>
                    <Box.Body>
                        <Row>
                            <Col span={24}>
                                {/* <Table
                                    rowKey="id"
                                    bordered
                                    dataSource={schedules}
                                    columns={tableColumns}
                                    pagination={tablePagination}
                                    loading={loading.table}
                                /> */}
                            </Col>
                        </Row>
                    </Box.Body>
                </Box>
            </ContainerBody>
            {/* <Modal
                title="错误日志"
                wrapClassName="ant-modal-large"
                visible={execLogModalVisible}
                onCancel={closeExecLogModal}
                footer={false}
            >
                {execLog}
            </Modal> */}
        </Container>
    )
}



// const mapStateToProps = createStructuredSelector({
//     schedules: makeSelectSchedules(),
//     currentProject: makeSelectCurrentProject(),
//     loading: makeSelectLoading()
//   })

//   function mapDispatchToProps(dispatch) {
//     return {
//       onLoadSchedules: (projectId) =>
//         dispatch(ScheduleActions.loadSchedules(projectId)),
//       onDeleteSchedule: (id) => dispatch(ScheduleActions.deleteSchedule(id)),
//       onChangeScheduleJobStatus: (id, currentStatus) =>
//         dispatch(ScheduleActions.changeSchedulesStatus(id, currentStatus)),
//       onExecuteScheduleImmediately: (id, resolve) =>
//         dispatch(ScheduleActions.executeScheduleImmediately(id, resolve))
//     }
//   }

//   const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )

// const withReducer = injectReducer({ key: 'schedule', reducer })
// const withSaga = injectSaga({ key: 'schedule', saga })

export default compose(
    // withReducer,
    // withSaga,
    // withConnect
)(ImportMain)
