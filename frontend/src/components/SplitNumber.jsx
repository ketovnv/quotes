
export const SplitNumber = ({ endValue, duration }) => {
    const [digits, setDigits] = useState(String(endValue).split('').map(Number));

    useEffect(() => {
        const interval = setInterval(() => {
            const newDigits = String(endValue).split('').map(Number);
            setDigits(newDigits);
        }, duration);

        return () => clearInterval(interval);
    }, [endValue]);

    return (
        <span>
      {digits.map((digit, index) => (
          <span key={index}>{digit}</span>
      ))}
    </span>
    );
};