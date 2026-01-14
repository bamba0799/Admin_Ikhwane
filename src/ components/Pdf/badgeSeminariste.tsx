import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Assuming the background image (image 1) is saved as 'background-badge.png' in the same directory or appropriate path.
// You can import it like this:
import backgroundImage from './../../assets/image_badge_semi.jpeg'; // Replace with the actual file name/path of image 1
import Button from '../Button/Button';

interface BadgeProps {
  firstname: string;
  lastname: string;
  niveau: string;
  dortoir: string;
}

const BadgeSeminariste = ({ firstname, lastname, niveau, dortoir }: BadgeProps) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const handlePrintToPDF = () => {
    if (badgeRef.current) {
      html2canvas(badgeRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${lastname}_${firstname}_badge.pdf`);
      });
    }
  };

  return (
    <div>
      <div
        ref={badgeRef}
        className="badge-container"
        style={{
          width: '360px', // Increased from 300px to enlarge (20% larger)
          height: '600px', // Increased from 500px to enlarge (20% larger)
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#8B0000', // Dark red to match the text color in image 2
          fontFamily: 'sans-serif', // Adjust to match the font if needed
          textAlign: 'center',
          border: '14px solid #8B0000', // Optional, to mimic the border if present
        }}
      >
        {/* Name overlay */}
        <div style={{
          position: 'absolute',
          top: '144px', // Scaled up from 120px to match enlargement
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '29px', // Scaled up from 24px
          fontWeight: 'bold',
          width: '80%', // To allow text wrapping if needed
        }}>
          <div className='flex flex-col'>
            <p>{firstname}</p>
            <p>{lastname}</p>
          </div>
        </div>

        {/* Niveau section */}
        <div style={{
          position: 'absolute',
          top: '284px', // Scaled up from 220px to match enlargement
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '22px', // Scaled up from 18px
          color: '#8B0000', // Orange-red to match
        }}>
          <div className=''>
            <p className='text-[18px]'>NIVEAU</p>
            <p className='text-[18px] text-[#FF4500]'>{niveau}</p>
          </div>
        </div>

        {/* Dortoir section */}
        <div style={{
          position: 'absolute',
          top: '336px', // Scaled up from 280px to match enlargement
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '22px', // Scaled up from 18px
          color: '#8B0000', // Orange-red to match
        }}>
          <div className='w-[320px] mx-auto'>
            <p className='text-[18px]'>DORTOIR</p>
            <p className='text-[18px] text-[#FF4500]'>{dortoir}</p>
          </div>
        </div>

        {/* The rest of the elements like logo, SÉMINARISTE, and event info are part of the background image */}
      </div>

      <div className='flex justify-end'>
        <Button onClick={handlePrintToPDF} outline={true} className='button-icon bg-tertiary_green mt-[40px]' bg={''}>
          <p className='text-secondary_green'> Imprimer en PDF</p>
        </Button>
      </div>
    </div>
  );
};

export default BadgeSeminariste;