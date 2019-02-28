<template>
    <v-select
        v-model='selected'
        :items="users"
        :placeholder='placeholder'
        @change='onSelect'
        solo
        :flat='flat'
        >
        <div v-if='displaySelection' slot='selection'>
            <user-card inline :user='selected' />
        </div>
        <div v-else slot='selection'>
            {{placeholder}}
        </div>
        <div class='item-entry' slot='item' slot-scope='{ item }'>
            <user-card inline :user='item' />
        </div>
    </v-select>
</template>

<script>
import UserCard from './UserCard';

export default {
    components: {
        'user-card': UserCard
    },
    props: {
        users: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: 'Dodaj učenika'
        },
        displaySelection: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            selected: null
        }
    },
    methods: {
        onSelect(value) {
            this.$emit('select', value)
        }
    }
}
</script>