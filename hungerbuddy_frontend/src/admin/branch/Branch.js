import BranchInterface from './branchInterface'
import DisplayAllBranch from './DisplayAllbranch'
import { useState } from 'react'

export default function Branch() {
    const [refresh, setRefresh] = useState(false)

    return (
        <div>
            <BranchInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayAllBranch refresh={refresh} setRefresh={setRefresh} />
        </div>
    )

}