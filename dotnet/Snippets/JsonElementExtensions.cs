using System.Collections.Immutable;
using System.Text.Json;

public static class JsonElementExtension
{
    /// <summary>
    /// Unwraps JsonElement as best it can
    /// </summary>
    /// <param name="jsonElement"></param>
    /// <returns>returns an object which may contain a dotnet primitive or a ReadOnlyCollection&lt;object?&gt; or an ImmutableDictionary&lt;string, object?&gt;</returns>
    public static object? DeserializeToPrimitive(this JsonElement jsonElement)
    {
        switch (jsonElement.ValueKind)
        {
            case JsonValueKind.String:
                return jsonElement.Deserialize(typeof(string));

            case JsonValueKind.Number:
                return jsonElement.Deserialize(typeof(int));

            case JsonValueKind.False:
            case JsonValueKind.True:
                return jsonElement.Deserialize(typeof(bool));

            case JsonValueKind.Array:
                var list = new List<object?>();
                foreach(var el in jsonElement.EnumerateArray()){
                    list.Add(el.DeserializeToPrimitive());
                }
                return list.AsReadOnly();

            case JsonValueKind.Object:
                var dict = new Dictionary<string, object?>();
                foreach(var el in jsonElement.EnumerateObject()){
                    dict.Add(el.Name, el.Value.DeserializeToPrimitive());
                }
                return dict.ToImmutableDictionary();
            default:
                return jsonElement.Deserialize(typeof(object));
        }
    }
}