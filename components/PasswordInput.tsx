import { Ionicons } from '@expo/vector-icons'; // or any other icon set you use
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS } from '../constants/Colors';

interface PasswordInputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    error,
    style,
    icon,
    ...props
}) => {
    const [secure, setSecure] = useState(true);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[styles.inputWrapper, error && styles.inputError]}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={COLORS.inputPlaceHolder}
                    secureTextEntry={secure}
                    {...props}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Ionicons
                        name={secure ? 'eye-off' : 'eye'}
                        size={20}
                        color={COLORS.inputPlaceHolder}
                    />
                </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginBottom: 24,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textWhite,
        fontFamily: 'PlusJakartaSans',
        marginBottom: 6,
    },
    inputWrapper: {
        height: 46,
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Inter',
        color: COLORS.textWhite,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 6,
        fontFamily: 'Inter',
    },
    icon: {
        marginRight: 10,
    },
});

export default PasswordInput;
