import { observable, action } from 'mobx'
import { login } from '@/services/CurUser'

class CurUserStore {

    @observable
    public token: string = ''

    @observable
    public userId: string = ''

    @observable
    public role: object = {}

    @observable
    public resources: object = {}

    @action
    public login = (data): void => {
        login(data).then((res) => {
            this.token = res.data.content.token
            this.userId = res.data.content.userId
            this.role = res.data.content.role
            this.resources = res.data.content.resources
        })
    }  
}

export default new CurUserStore()