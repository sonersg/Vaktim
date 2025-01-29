import React, { useContext, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import Konsol from "../components/Konsol";
import { MMKVstorage } from "./CitiesListScreen";
import { ReRenderContext } from "../context/ReRenderContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsScreen = () => {
    const [highlight, setHighlight] = useState(
        MMKVstorage.getString("show-times-when") || "always"
    );
    const [themeColor, setthemeColor] = useState(
        MMKVstorage.getString("theme-color") || "skyblue"
    );

    const data = useContext(ReRenderContext);
    const insets = useSafeAreaInsets();

    const setAndNotify = (key: string, value: string) => {
        // set storage
        MMKVstorage.set(key, value);

        // set state
        if (key === "show-times-when") setHighlight(value);
        if (key === "theme-color") setthemeColor(value);

        // invoke rerendering with context api
        data.setReRender(prev => !prev);
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#242424",
                paddingHorizontal: 10,
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <View>
                <ScrollView>
                    <Konsol />

                    <View style={styles.sectionContainer}>
                        <Text style={styles.text}>Duvar kağıdı ayarla:</Text>
                        <Text style={{ fontSize: 12, color: "white" }}>
                            Duvar kağıdı ayarlamak için internetten bulduğunuz
                            herhangi bir fotoğrafı yeni sekmede açıp linkini
                            konsola yapıştırabilirsiniz.
                        </Text>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.text}>
                            Bir sonraki namaza kalan vakti:
                        </Text>
                        <View style={styles.rowContainer}>
                            <TouchableHighlight
                                style={[
                                    styles.radioBtn,
                                    { borderColor: themeColor },
                                    highlight === "always" && {
                                        backgroundColor: themeColor,
                                    },
                                ]}
                                onLongPress={() =>
                                    setAndNotify("show-times-when", "always")
                                }
                            >
                                <Text style={styles.text}>
                                    Her Zaman Göster
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={[
                                    styles.radioBtn,
                                    { borderColor: themeColor },
                                    highlight === "on-press" && {
                                        backgroundColor: themeColor,
                                    },
                                ]}
                                onLongPress={() =>
                                    setAndNotify("show-times-when", "on-press")
                                }
                            >
                                <Text style={styles.text}>
                                    Dokunduğunda Göster
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.text}>Bir renk seç?</Text>
                        <View style={styles.rowContainer}>
                            <TouchableHighlight
                                style={[
                                    styles.radioBtn,
                                    { borderColor: "hotpink" },
                                    themeColor === "hotpink" && {
                                        backgroundColor: "hotpink",
                                    },
                                ]}
                                onLongPress={() =>
                                    setAndNotify("theme-color", "hotpink")
                                }
                            >
                                <Text style={styles.text}>Pembe</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={[
                                    styles.radioBtn,
                                    { borderColor: "skyblue" },
                                    themeColor === "skyblue" && {
                                        backgroundColor: "skyblue",
                                    },
                                ]}
                                onLongPress={() =>
                                    setAndNotify("theme-color", "skyblue")
                                }
                            >
                                <Text style={styles.text}>Mavi</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        backgroundColor: "#555",
        paddingVertical: 10,
    },

    rowContainer: {
        flexDirection: "row",
    },

    btn: {
        backgroundColor: "red",
        paddingBottom: 5,
        margin: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    radioBtn: {
        padding: 5,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 3,
    },

    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
});

export default SettingsScreen;
