<template>
    <div class="mt-1 pt-4 overflow-hidden">
        <div class="flex justify-between items-center">
            <span class="pb-2">Status</span>
            <div class="flex justify-between items-center pb-1 ml-4">
                <small
                    v-for="(status, method) in methods"
                    :key="method"
                    class="flex justify-between items-center rounded-md p-1 mx-1"
                    :class="status ? 'bg-green-100' : 'bg-red-100'"
                >
                    <small>{{ method }}</small>
                </small>
            </div>
            <span
                class="w-full border-gray-200 border-t border-dashed mx-4"
            ></span>
            <template v-if="txs.status">
                <code
                    class="bg-green-100 text-green-600 border-green-200 text-sm p-1 rounded border"
                    >Success</code
                >
            </template>
            <template v-else>
                <code
                    class="bg-red-100 text-red-600 border-red-200 text-sm p-1 rounded border"
                    >Unknown</code
                >
            </template>
        </div>
        <template v-if="txs.status">
            <div class="flex justify-between items-center pt-3">
                <span class="pb-2">Value</span>
                <span
                    class="w-full border-gray-200 border-t border-dashed mx-4"
                ></span>
                <code
                    class="whitespace-nowrap bg-gray-100 text-sm p-1 rounded border"
                    >{{ txs.value }} Eth</code
                >
            </div>
            <div class="flex justify-between items-center pt-3">
                <span class="pb-2">From</span>
                <span
                    class="w-full border-gray-200 border-t border-dashed mx-4"
                ></span>
                <a :href="`https://etherscan.io/address/${txs.from}`">
                    <code class="bg-gray-100 text-sm p-1 rounded border">{{
                        txs.from || '!!'
                    }}</code>
                </a>
            </div>
            <div class="flex justify-between items-center pt-3">
                <span class="pb-2">To</span>
                <span
                    class="w-full border-gray-200 border-t border-dashed mx-4"
                ></span>
                <a :href="`https://etherscan.io/address/${txs.to}`">
                    <code class="bg-gray-100 text-sm p-1 px-2 rounded border">{{
                        txs.to || '!!'
                    }}</code>
                </a>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TxsResult',
    props: {
        methods: {
            type: Object,
            default() {
                return {
                    crawler: false,
                    http: false,
                    sdk: false,
                }
            },
        },
        txs: {
            type: Object,
            default() {
                return {
                    status: false,
                    value: 0,
                    from: null,
                    to: null,
                }
            },
        },
    },
}
</script>
