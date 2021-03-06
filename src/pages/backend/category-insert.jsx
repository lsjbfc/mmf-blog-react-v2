import React, { Component } from 'react'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { setMessage } from '~utils'
import api from '~api'
import AInput from '~components/_input.jsx'

function mapStateToProps(state) {
    return {
        category: state.category.toJS().item
    }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
@immutableRenderDecorator
export default class CategoryModify extends Component {
    constructor(props) {
        super(props)
        const { cate_name, cate_order } = props.category
        this.state = {
            cate_name,
            cate_order
        }
        this.handleInsert = this.handleInsert.bind(this)
    }
    async handleInsert() {
        if (!this.state.cate_name || !this.state.cate_order) {
            setMessage('请将表单填写完整!')
            return
        }
        const {
            data: { message, code, data }
        } = await api.post('backend/category/insert', this.state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            this.props.dispatch({ type: 'insertCategoryItem', item: data })
            this.props.history.push('/backend/category/list')
        }
    }
    render() {
        return (
            <div className="settings-main card">
                <div className="settings-main-content">
                    <AInput title="分类名称">
                        <input
                            value={this.state.cate_name}
                            onChange={e => this.setState({ cate_name: e.target.value })}
                            type="text"
                            placeholder="分类名称"
                            className="base-input"
                            name="cate_name"
                        />
                        <span className="input-info error">请输入分类名称</span>
                    </AInput>
                    <AInput title="分类排序">
                        <input
                            value={this.state.cate_order}
                            onChange={e => this.setState({ cate_order: e.target.value })}
                            type="text"
                            placeholder="分类排序"
                            className="base-input"
                            name="cate_order"
                        />
                        <span className="input-info error">请输入分类排序</span>
                    </AInput>
                </div>
                <div className="settings-footer clearfix">
                    <a onClick={this.handleInsert} href="javascript:;" className="btn btn-yellow">
                        添加分类
                    </a>
                </div>
            </div>
        )
    }
}
