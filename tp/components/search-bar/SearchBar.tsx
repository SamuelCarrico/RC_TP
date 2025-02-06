import React, {useState, useCallback} from "react";
import {View, FlatList, TouchableOpacity, Text} from "react-native";
import {TextInput, ActivityIndicator, Button} from "react-native-paper";
import styles from "../../styles/styles";
import EdamamService from "../../services/edamam.service";
import useDatabase from "../../hooks/useDatabase";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchSuggestions = useCallback(async (text: string) => {
        if (text.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        const suggestions = await EdamamService.getRecipes({q: text});
        setResults(suggestions.map((suggestion) => suggestion));
        console.log(suggestions);
        setLoading(false);
    }, []);
    const {addFood} = useDatabase();

    const getDetailsAndSaveFood = async (name: string) => {
        try {
            const meal = await EdamamService.getFoodByName({ ingr: name });

            if (!meal || (!meal.parsed?.length && !meal.hints?.length)) {
                console.warn("Aucun aliment trouvé pour :", name);
                return;
            }

            const foodData = meal.parsed?.[0]?.food || meal.hints?.[0]?.food;

            if (!foodData) {
                console.warn("Données invalides pour :", name);
                return;
            }

            console.log("Aliment récupéré :", foodData);

            await addFood(
                foodData.label || "Inconnu",
                foodData.nutrients?.ENERC_KCAL ?? 0,
                foodData.nutrients?.PROCNT ?? 0,
                foodData.nutrients?.CHOCDF ?? 0,
                foodData.nutrients?.FAT ?? 0,
                1 //TODO Changer valeur de Test
            );

            console.log("Aliment ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'aliment :", error);
        }
    };


    const handleSearch = (text: string) => {
        setQuery(text);
        fetchSuggestions(text);
    };

    return (
        <View style={{padding: 10}}>
            <TextInput
                label="Rechercher un aliment"
                value={query}
                onChangeText={handleSearch}
                mode="outlined"
                left={<TextInput.Icon icon="magnify"/>}
                right={loading ? <ActivityIndicator animating size="small"/> : null}
            />

            {results.length > 0 && (
                <View>
                    <FlatList
                        data={results}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.listSearchBar}
                                onPress={() => setQuery(item)}
                            >
                                <View style={styles.listSearchItem}>
                                    <Text>{item}</Text>
                                    <Button icon='plus' mode='outlined' onPress={() => getDetailsAndSaveFood(item)}>
                                        <Text>Ajouter</Text>
                                    </Button>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    <Button icon='close' onPress={() => {
                        setQuery('');
                        setResults([]);
                    }}>Fermer la liste</Button>
                </View>)}


        </View>
    );
}
