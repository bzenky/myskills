import React, { useEffect, useState } from 'react'
import {
    FlatList,
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native'
import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
    id: string
    name: string
    date?: Date
}

export function Home() {
    const [newSkill, setNewSkill] = useState('')
    const [mySkills, setMySkills] = useState<SkillData[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        setMySkills([...mySkills, data])
        setNewSkill('')
    }

    function handleRemoveSkill(id: string) {
        setMySkills(mySkills.filter(skill => skill.id !== id))
    }

    useEffect(() => {
        const currentHour = new Date().getHours()

        if (currentHour < 12) {
            setGreeting('Good Morning')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon')
        } else {
            setGreeting('Good Night')
        }

    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Zenky</Text>

            <Text style={styles.greetings}>
                {greeting}
            </Text>

            <TextInput
                style={styles.input}
                placeholder='New Skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <Button
                title="Add"
                onPress={handleAddNewSkill}
            />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SkillCard
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)}
                    />
                )}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 30,
        padding: 10,
        color: '#fff',
        fontSize: 18,
        backgroundColor: '#1F1E25',
        borderRadius: 7
    },
    greetings: {
        color: '#fff',
    }
})