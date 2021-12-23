<template>
    <div
        class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
    >
        <div class="lg:w-1/3 max-w-full mx-auto px-2 sm:px-6 lg:px-8">
            <EtherflowLogo />
            <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
                <h2 class="text-2xl leading-7 font-semibold">
                    <span>Get ETH txn status</span>
                </h2>
                <p class="mt-3 text-gray-600">
                    <span>Enter</span>
                    <span class="button--doc text-green-500">txn hash</span>
                    <span>to check by</span>
                    <a
                        href="https://github.com/dalirnet/etherflow/blob/master/src/methods/Crawler.js"
                        class="text-green-500 hover:underline"
                        target="_blank"
                        >Crawler</a
                    >
                    <span>,</span>
                    <a
                        href="https://github.com/dalirnet/etherflow/blob/master/src/methods/Http.js"
                        class="text-green-500 hover:underline"
                        target="_blank"
                        >Http</a
                    >
                    <span>,</span>
                    <a
                        href="https://github.com/dalirnet/etherflow/blob/master/src/methods/Sdk.js"
                        class="text-green-500 hover:underline"
                        target="_blank"
                        >Sdk</a
                    >
                    <span>methods.</span>
                    <template v-if="blockNumber">
                        <span>over</span>
                        <span class="text-green-500">{{
                            new Intl.NumberFormat().format(blockNumber)
                        }}</span>
                        <span>blocks!</span>
                    </template>
                </p>
                <div class="pt-4 space-x-2">
                    <input
                        ref="txnHash"
                        class="p-2 rounded-md border-2 border-green-300 w-full"
                        placeholder="Type and Enter / For example 0x00000000000000"
                        @keyup.enter="check"
                        @change="check"
                    />
                </div>
                <template v-if="computedLoadingState">
                    <div class="flex justify-center items-center pt-8 pb-4">
                        <svg
                            class="animate-spin h-5 w-5 mr-2 text-green-300"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span class="text-green-500">Loading</span>
                    </div>
                </template>
                <template v-else-if="computedLoadedState">
                    <TxnResult :txn="txn" :methods="methods" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlaygroundCom',
    props: {
        firstState: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            state: null,
            blockNumber: 0,
            methods: {
                crawler: false,
                http: false,
                sdk: false,
            },
            txn: {
                methods: {},
                status: false,
                value: 0,
                from: null,
                to: null,
            },
        }
    },
    fetch() {
        if (this.$route.name === 'txn-hash' && this.computedTxnHash) {
            this.state = 'loading'
            Promise.allSettled(
                Object.keys(this.methods).map((method) => {
                    return this.$axios.$get(
                        `/api/${method}/getTxnStatus/${this.computedTxnHash}`
                    )
                })
            )
                .then((values) => {
                    this.$nextTick(() => {
                        values.forEach(({ value = {} }) => {
                            if (value?.status) {
                                this.txn = value
                                this.methods[value.method] = true
                            }
                        })
                    })
                    this.state = 'loaded'
                })
                .catch(() => {
                    this.state = 'none'
                })
        } else {
            this.state = 'none'
        }
    },
    computed: {
        computedLoadedState() {
            return this.state === 'loaded'
        },
        computedLoadingState() {
            return this.state === 'loading'
        },
        computedTxnHash() {
            return this.$route.params.hash
        },
    },
    created() {
        this.state = this.firstState
    },
    mounted() {
        this.$refs.txnHash.value = this.computedTxnHash || ''
        this.$axios
            .$get('/api/sdk/getBlockNumber')
            .then((blockNumber) => {
                this.blockNumber = blockNumber
            })
            .catch(() => {})
    },
    methods: {
        check(e) {
            if (e.target.value) {
                this.$router.push({
                    name: 'txn-hash',
                    params: { hash: e.target.value },
                })
            }
        },
    },
    fetchOnServer: false,
}
</script>
