import React, {Component} from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'

import './app.css'


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: 'That is good', important: false, like: false, id: 2},
                {label: 'I need a break...', important: true, like: false, id: 3}
            ],
            tern: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLiked = this.onToggleLiked.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelec = this.onFilterSelec.bind(this)

        this.maxId = 4
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }
    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) =>{
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            const newItem = {...old, important: !old.important}
            const newArr =  [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            const newItem = {...old, like: !old.like}
            const newArr =  [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }

    searchPost(items, tern) {
        if(tern.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(tern) > -1
         })
    }
    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch(tern) {
        this.setState({tern})
    }

    onFilterSelec(filter) {
        this.setState({filter})
    }

    render() {
        const {data, tern, filter} = this.state
        const liked = data.filter(item => item.like).length
        const allPosts = data.length
        const visiblePosts = this.filterPost(this.searchPost(data, tern), filter)
        return (
            <div className='app'>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className='search-panel d-flex'>
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter filter={filter} onFilterSelec={this.onFilterSelec}/>
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                />
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}