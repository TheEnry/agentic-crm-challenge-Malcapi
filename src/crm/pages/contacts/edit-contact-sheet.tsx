import { useEffect } from 'react';
import { Contact } from '@/crm/types/contact';
import { useContacts } from '@/hooks/use-contacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  position: z.string().optional(),
  logo: z.string().optional(),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

export function EditContactSheet({
  contact,
  open,
  onOpenChange,
}: {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { modifyContact } = useContacts();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      position: '',
      logo: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      state: '',
      city: '',
      zip: '',
      country: '',
      linkedin: '',
      twitter: '',
      github: '',
      instagram: '',
      facebook: '',
    },
  });

  useEffect(() => {
    if (contact) {
      form.reset({
        name: contact.name,
        position: contact.position || '',
        logo: contact.logo || '',
        company: contact.company || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        state: contact.state || '',
        city: contact.city || '',
        zip: contact.zip || '',
        country: contact.country || '',
        linkedin: contact.socialLinks?.linkedin || '',
        twitter: contact.socialLinks?.twitter || '',
        github: contact.socialLinks?.github || '',
        instagram: contact.socialLinks?.instagram || '',
        facebook: contact.socialLinks?.facebook || '',
      });
    }
  }, [contact, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!contact) return;

    try {
      // Build social links object
      const socialLinks: Contact['socialLinks'] = {};
      if (data.linkedin) socialLinks.linkedin = data.linkedin;
      if (data.twitter) socialLinks.twitter = data.twitter;
      if (data.github) socialLinks.github = data.github;
      if (data.instagram) socialLinks.instagram = data.instagram;
      if (data.facebook) socialLinks.facebook = data.facebook;

      // Update contact
      const updates: Partial<Contact> = {
        name: data.name,
        email: data.email || undefined,
        phone: data.phone || undefined,
        position: data.position || undefined,
        company: data.company || undefined,
        address: data.address || undefined,
        state: data.state || undefined,
        city: data.city || undefined,
        zip: data.zip || undefined,
        country: data.country || undefined,
        logo: data.logo || undefined,
        socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
      };

      modifyContact(contact.id, updates);

      // Show success toast
      toast.custom((t) => (
        <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>Contact updated successfully</AlertTitle>
        </Alert>
      ));

      onOpenChange(false);
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:w-[600px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle className="flex items-center gap-2.5">
            <Users className="text-primary size-4" />
            Edit Contact
          </SheetTitle>
        </SheetHeader>
        <SheetBody className="px-5 py-0">
          <ScrollArea className="h-[calc(100dvh-11.75rem)] pe-3 -me-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 py-6"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Position */}
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* State */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Zip */}
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn */}
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="LinkedIn URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Twitter */}
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="Twitter URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </ScrollArea>
        </SheetBody>

        <SheetFooter className="flex items-center justify-end border-t py-3.5 px-5 border-border">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
