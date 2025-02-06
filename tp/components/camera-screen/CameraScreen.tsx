import {router} from "expo-router";
import {View, ActivityIndicator, Pressable, Button, Alert, Text} from "react-native";
import {
    useCameraPermissions,
    CameraView,
    CameraType,
    CameraCapturedPicture,
    BarcodeScanningResult,
} from "expo-camera";
import {useEffect, useState, useRef} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import EdamamService from "../../services/edamam.service";
import styles from "../../styles/styles";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>("back");
    const camera = useRef<CameraView>(null);
    const [picture, setPicture] = useState<CameraCapturedPicture>();
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (permission && !permission.granted && permission.canAskAgain) {
            requestPermission();
        }
    }, [permission]);

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    const takePicture = async () => {
        const res = await camera.current?.takePictureAsync();
        setPicture(res);
    };

    const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
        if (!scannedData) {
            setScannedData(result.data);
            setLoading(true);
            console.log("Code-barres détecté :", result.data);

            try {
                const productData = await EdamamService.getMealByBarcode({ upc: result.data });
                if (productData) {
                    setProduct(productData);
                } else {
                    Alert.alert("Aucun produit trouvé", "Essayez de scanner un autre code-barres.");
                }
            } catch (error) {
                Alert.alert("Erreur", "Impossible de récupérer les informations du produit.");
            }

            setLoading(false);
        }
    };

    if (!permission?.granted) {
        return <ActivityIndicator />;
    }


    return (
        <View>
            {!scannedData ? (
                <CameraView
                    ref={camera}
                    mode="video"
                    style={styles.camera}
                    facing={facing}
                    barcodeScannerSettings={{
                        barcodeTypes: ["ean13", "upc_a", "upc_e"],
                    }}
                    onBarcodeScanned={handleBarCodeScanned}
                >
                    <View style={styles.footer}>
                        <Pressable
                            style={styles.recordButton}
                            onPress={takePicture}
                        />
                        <MaterialIcons name="flip-camera-ios" size={24} color={"white"} onPress={toggleCameraFacing} />
                    </View>
                </CameraView>
            ) : (
                <View style={styles.resultContainer}>
                    {loading ? (
                        <ActivityIndicator animating size="large" />
                    ) : product ? (
                        <View>
                            <Text style={styles.productName}>{product.label ?? "Produit inconnu"}</Text>
                            <Text>Calories: {product.nutrients?.ENERC_KCAL ?? "N/A"}</Text>
                            <Button title="Scanner à nouveau" onPress={() => setScannedData(null)} />
                        </View>
                    ) : (
                        <Text>Aucune information trouvée</Text>
                    )}
                </View>
            )}

            <MaterialIcons
                name="close"
                color={"white"}
                style={styles.close}
                size={30}
                onPress={() => router.back()}
            />
        </View>
    );
}

