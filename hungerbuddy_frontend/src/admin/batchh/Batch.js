import BatchDisplay from "./BatchDisplay";
import BatchInterface from "./BatchInterface";

import { useState } from "react";

export default function Batch() {
    const [refresh, setRefresh] = useState(false);
    return (
        <div>
            <BatchInterface refresh={refresh} setRefresh={setRefresh} />
            <BatchDisplay refresh={refresh} setRefresh={setRefresh} />
        </div>
    )
}